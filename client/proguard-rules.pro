# כללים לשמירה על ספריות רשת נפוצות (Retrofit/OkHttp/Fetch API)
# אם אתה משתמש ב-Fetch API או ב-XMLHttpRequest, כללי ה-keep האלה בדרך כלל מספיקים:
-keep class com.facebook.react.bridge.** { *; }

# אם אתה משתמש ב-OkHttp או Retrofit דרך ספריות צד שלישי (במיוחד אם יש reflection):
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# שמור על כל הקלאסים והשיטות בהוקים ובמודלים שלך שמעורבים ב-FormData
# החלף com.your.app בנתיב הנכון שלך
-keep class com.your.app.hooks.useAudioUploader { *; } 
-keep class com.your.app.network.requestModels.** { *; }

# כללים כלליים לשמירה על כל קלאס שיש לו שדה בשם 'audioFile'
-keepclassmembers class * {
    java.lang.String audioFile;
}

# שמור על קלאסים שמשמשים לחישוב Layout
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.views.** { *; }
-dontwarn com.facebook.react.uimanager.**