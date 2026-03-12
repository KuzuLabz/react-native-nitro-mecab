#pragma once

#include "HybridNitroMecabSpec.hpp"
#include "mecab.h"

namespace margelo::nitro::nitromecab {
  class HybridMecab: public HybridNitroMecabSpec {
  private:
      std::optional<MeCab::Model*> model;
      std::optional<MeCab::Tagger*> tagger;
  public:
    HybridMecab(): HybridObject(TAG) {}
      ~HybridMecab() {
          if (tagger.has_value()) {
              MeCab::deleteTagger(tagger.value());
              tagger.reset();
          }

          if (model.has_value()) {
              MeCab::deleteModel(model.value());
              model.reset();
          }
      };

    // Setup
    std::shared_ptr<Promise<void>> initialize(const std::string& dictUri, const std::optional<std::vector<std::string>>& userDictUris) override;
    void deinitialize() override;
    bool getIsInitialized() override;

    // Main
    std::string tokenize(const std::string& text) override;
    std::vector<std::string> wakati(const std::string& text) override;
    std::vector<Node> parseToNode(const std::string& text) override;
      
    std::shared_ptr<Promise<std::string>> getLattice(const std::string& text, double nBest) override;

    // Utils
    std::vector<DictionaryInfo> getDictionaryInfo() override;
    std::string getVersion() override;
  };

inline DictionaryInfoType getDictInfoType(const int type) {
    switch (type) {
        case MECAB_SYS_DIC:
            return DictionaryInfoType::SYSDIC;
        case MECAB_USR_DIC:
            return DictionaryInfoType::USERDIC;
        default:
            return DictionaryInfoType::UNKNOWN;
    }
};

}
