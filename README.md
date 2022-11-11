# Googlemap-Comment
## Project setup
### 1. Google Platform Map API Setup
https://developers.google.com/maps?hl=ja

## Glitch Server
- axios to ver 0.27.2
     - With axios ver1.x, Glitch causes an error because import is specified on the nodemodule side.
```
 "axios": "^0.27.2"
```
- .env setup
```
API_KEY:'xxxx'
```

## Google Place API Specification
■仕様
- [PlaceReview](https://developers.google.com/maps/documentation/places/web-service/details#PlaceReview)
    - 最大取得件数5件(5件以上取得する場合は、Webスクレイピングになる)
    - 口コミは関連性と新しい順で取得することができる(アルゴリズムはブラックボックス)
    - コメントのいいねは取得できない。
- [PlacePhoto](https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto)
     - 最大取得件数10件(10件以上取得する場合は、Webスクレイピングになる)
     - Google Map(ALL)から取得されている
- [Nearby Search](https://developers.google.com/maps/documentation/places/web-service/search-nearby) ：指定されたエリア内の場所を検索できます。キーワードを指定するか、検索する場所のタイプを指定して、検索リクエストを絞り込むことができる.

## Reference
- [Place API](https://outscraper.com/ja/google-maps-reviews-api/)
- [Google Places APIを使って地図上の口コミを分析する方法](https://gaaaon.jp/blog/google_map_api)
