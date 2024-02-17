# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

/**
 * ProGuard configuration file for Android app.
 * 
 * This file specifies the rules for keeping certain classes and their members during the ProGuard obfuscation process.
 * The rules in this file are specific to the Google Play Services APIs.
 * 
 * -keep class * extends com.google.android.gms.common.api.Api$ApiOptions {
 *     *;
 * }
 * 
 * -keep class * extends com.google.android.gms.common.api.Api$ApiOptions$HasGoogleSignInAccountOptions {
 *     *;
 * }
 * 
 * -keep class * extends com.google.android.gms.common.api.Api$ApiOptions$NotRequiredOptions {
 *     *;
 * }
 * 
 * -keep class * extends com.google.android.gms.common.api.Api$ApiOptions$HasOptions {
 *     *;
 * }
 * 
 * -dontwarn com.google.android.gms.**
 */
