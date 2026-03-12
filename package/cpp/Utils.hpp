#include "mecab.h"
#include "HybridNitroMecabSpec.hpp"

namespace margelo::nitro::nitromecab::utils {

inline std::string clean_file_path(std::string uri) {
    const std::string prefix = "file://";
    
    if (uri.substr(0, prefix.size()) == prefix) {
        return std::string(uri.substr(prefix.size()));
    }
    
    return std::string(uri);
};

inline NodeStatus getNodeStatus(const unsigned char stat) {
    switch (stat) {
        case MECAB_NOR_NODE:
            return NodeStatus::NORMAL;
        case MECAB_BOS_NODE:
            return NodeStatus::BOS;
        case MECAB_EOS_NODE:
            return NodeStatus::EOS;
        case MECAB_EON_NODE:
            return NodeStatus::EON;
        case MECAB_UNK_NODE:
            return NodeStatus::UNKNOWN;
        default:
            return NodeStatus::UNKNOWN;
    }
};

inline Node createNode(const MeCab::Node* mc_node) {
    Node nn;
    
    nn.surface = std::string(mc_node->surface, mc_node->length);
    nn.length = mc_node->length;
    nn.charType = mc_node->char_type;
    nn.cost = mc_node->cost;
    nn.feature = mc_node->feature;
    nn.id = mc_node->id;
    nn.isBest = mc_node->isbest == '1';
    nn.lcAttr = mc_node->lcAttr;
    nn.posId = mc_node->posid;
    nn.rLength = mc_node->rlength;
    nn.rcAttr = mc_node->rcAttr;
    nn.status = getNodeStatus(mc_node->stat);
    nn.wordCost = mc_node->wcost;
    
    return nn;
};

//inline Token getFeatureToken(const std::vector<std::string> features, DictType dictType) {
//    Token token;
//    
//    token.pos = std::make_tuple(features[0], features[1], features[2], features[3]);
//    
//    token.conjugation.type = features[4];
//    token.conjugation.form = features[5];
//    processToken(token, features, dictType);
//    return token;
//};
//
//inline Token getTokenFromString(const char* str, DictType dictType) {
//    const auto features = splitSurfaceAndFeatures(str);
//    Token token = getFeatureToken(features.second, dictType);
//    token.surface = features.first;
//    return token;
//};
//
}
