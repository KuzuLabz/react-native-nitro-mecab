#if defined(__APPLE__) && defined(TARGET_OS_IPHONE)
    #define HAVE_DIRENT_H 0
#else
    #define HAVE_DIRENT_H 1
#endif
#define HAVE_FCNTL_H 1
#define HAVE_STDINT_H 1
#define HAVE_STRING_H 1
#define HAVE_SYS_STAT_H 1
#define HAVE_UNISTD_H 1
#define STDC_HEADERS 1

#define PACKAGE "mecab"
#define VERSION "0.996"
#define DIC_VERSION 102
#define MECAB_DEFAULT_RC "mecabrc"

/* Use compiler-defined macros for cross-platform size detection */
#ifdef __LP64__
  #define SIZEOF_LONG 8
  #define SIZEOF_SIZE_T 8
  #define SIZEOF_LONG_LONG 8
#else
  #define SIZEOF_LONG 4
  #define SIZEOF_SIZE_T 4
  #define SIZEOF_LONG_LONG 8
#endif

#define SIZEOF_CHAR 1
#define SIZEOF_INT 4
#define SIZEOF_SHORT 2