#include "HybridMecab.hpp"
#import "Utils.hpp"
#import <set>

namespace margelo::nitro::nitromecab {

    bool HybridMecab::getIsInitialized() {
        return model.has_value() && tagger.has_value();
    }

    // Setup
std::shared_ptr<Promise<void>> HybridMecab::initialize(const std::string &dictUri, const std::optional<std::vector<std::string>> &userDictUris) {
        return Promise<void>::async([=, this]() -> void {
            if (model.has_value()) {
                return;
            }
            
            auto clean_uri = utils::clean_file_path(dictUri);

            std::string arg = "-d " + clean_uri + " -r /dev/null";
            
            if (userDictUris.has_value()) {
                for (const auto& p : userDictUris.value()) {
                    arg += " -u " + p;
                }
            }

            MeCab::Model* rawModel = MeCab::createModel(arg.c_str());
            
            if (rawModel == nullptr) {
                throw std::runtime_error("Failed to load dictionary at '" + dictUri + "': " + std::string(MeCab::getLastError()));
            }
            
            model.emplace(rawModel);

            MeCab::Tagger* rawTagger = model.value()->createTagger();

            if (rawTagger == nullptr) {
                throw std::runtime_error("Failed to create tagger: " + std::string(MeCab::getLastError()));
            }
            
            tagger.emplace(rawTagger);
        });
    };

    void HybridMecab::deinitialize() {
        if (tagger.has_value()) {
            MeCab::deleteTagger(tagger.value());
            delete tagger.value();
            tagger.reset();
        }

        if (model.has_value()) {
            MeCab::deleteModel(model.value());
            delete model.value();
            model.reset();
        }
    };

    // Main
    std::string HybridMecab::tokenize(const std::string &text) {
        if (!tagger.has_value()) {
            throw std::runtime_error("Tagger not created. You must initialize first!");
        }
        
        auto result = tagger.value()->parse(text.c_str());

        return result;
    };

    std::vector<std::string> HybridMecab::wakati(const std::string &text) {
        if (!tagger.has_value()) {
            throw std::runtime_error("Tagger not created. You must initialize first!");
        }

        auto nodes = tagger.value()->parseToNode(text.c_str());
        
        if (!nodes) return {};
        
        std::vector<std::string> result;
        
        for (; nodes; nodes = nodes->next) {
            if (nodes->stat == MECAB_EOS_NODE || nodes->stat == MECAB_BOS_NODE || nodes->length < 1) {
                continue;
            } else {
                result.emplace_back(nodes->surface, nodes->length);
            }
        }

        return result;
    };

    std::vector<Node> HybridMecab::parseToNode(const std::string &text) {
        if (!tagger.has_value()) {
            throw std::runtime_error("Tagger not created. You must initialize first!");
        }
        
        std::vector<Node> nitro_nodes = {};
        auto *nodes = tagger.value()->parseToNode(text.c_str());
        
        if (!nodes) return {};

        while (nodes) {
            Node nn = utils::createNode(nodes);

            nitro_nodes.emplace_back(nn);
            nodes = nodes->next;
        }
        
        return nitro_nodes;
    };

    std::shared_ptr<Promise<std::string>> HybridMecab::getLattice(const std::string &text, double nBest) {
        if (!tagger.has_value()) {
            throw std::runtime_error("Tagger not created. You must initialize first!");
        }
        
        return Promise<std::string>::async([=, this]() -> std::string {
            auto lattice = MeCab::createLattice();
            if (!lattice) {
                throw std::runtime_error("Failed to create lattice!");
            }
            
            lattice->set_sentence(text.c_str());
            lattice->add_request_type(MECAB_NBEST);
            
            if (!tagger.value()->parse(lattice)) {
                delete lattice;
                throw std::runtime_error("Lattice parse failed!");
            }
            
            auto result = lattice->enumNBestAsString(static_cast<int>(nBest));
            return result;
        });
    };

    // Utils
    std::vector<DictionaryInfo> HybridMecab::getDictionaryInfo() {
        if (!model.has_value()) {
            throw std::runtime_error("Dictionary not initialized!");
        }

        auto info = model.value()->dictionary_info();

        std::vector<DictionaryInfo> data;

        while (info) {
            DictionaryInfo dict;
            dict.filename = info->filename;
            dict.charset = info->charset;
            dict.type = getDictInfoType(info->type);
            dict.version = info->version;
            dict.lSize = info->lsize;
            dict.rSize = info->rsize;
            dict.size = info->size;
            data.push_back(dict);
            info = info->next;
        }

        return data;
    };

    std::string HybridMecab::getVersion() {
        if (!model.has_value()) {
            throw std::runtime_error("Dictionary not initialized!");
        }

        auto version = model.value()->version();

        return {version};
    };

}
