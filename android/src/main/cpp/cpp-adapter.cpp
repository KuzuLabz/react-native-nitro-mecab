#include <jni.h>
#include "NitroMecabOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitromecab::initialize(vm);
}
