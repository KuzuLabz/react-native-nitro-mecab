project(NitroMecab)
cmake_minimum_required(VERSION 3.9.0)

set (PACKAGE_NAME NitroMecab)
set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 20)

# Define C++ library and add all sources
add_library(${PACKAGE_NAME} SHARED
        src/main/cpp/cpp-adapter.cpp
        ../cpp/HybridMecab.cpp

        # MECAB
        ../cpp/mecab/char_property.cpp
        ../cpp/mecab/connector.cpp
        ../cpp/mecab/context_id.cpp
        ../cpp/mecab/dictionary.cpp
        ../cpp/mecab/dictionary_rewriter.cpp
        ../cpp/mecab/eval.cpp
        ../cpp/mecab/feature_index.cpp
        ../cpp/mecab/iconv_utils.cpp
        ../cpp/mecab/lbfgs.cpp
        ../cpp/mecab/libmecab.cpp
        ../cpp/mecab/nbest_generator.cpp
        ../cpp/mecab/param.cpp
        ../cpp/mecab/shlex.cpp
        ../cpp/mecab/string_buffer.cpp
        ../cpp/mecab/tagger.cpp
        ../cpp/mecab/tokenizer.cpp
        ../cpp/mecab/utils.cpp
        ../cpp/mecab/viterbi.cpp
        ../cpp/mecab/writer.cpp
)

# Add Nitrogen specs :)
include(${CMAKE_SOURCE_DIR}/../nitrogen/generated/android/NitroMecab+autolinking.cmake)

# Set up local includes
include_directories(
        "src/main/cpp"
        "../cpp"
        "../cpp/mecab"
)

find_library(LOG_LIB log)

# Link all libraries together
target_link_libraries(
        ${PACKAGE_NAME}
        ${LOG_LIB}
        android                                   # <-- Android core
)

target_compile_definitions(${PACKAGE_NAME} PRIVATE 
  HAVE_CONFIG_H=1      # This tells MeCab to include your new file
  DIC_VERSION=102      # MeCab usually needs this version defined
)