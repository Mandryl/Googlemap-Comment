# Googlemap-Comment
## 事前準備
Google Platform Map APIを使えるようにする
https://developers.google.com/maps?hl=ja

## 実装メモ
- PlaceIDを取得しないとレビューと写真が取れない

## Todo
- Geocoding APIを使って緯度・経度から場所を検索する。

## Google Detail API Request List
[Place API](https://outscraper.com/ja/google-maps-reviews-api/)

### PlaceDetail
■仕様
- [PlaceReview](https://developers.google.com/maps/documentation/places/web-service/details#PlaceReview)
    - 最大取得件数5件(5件以上取得する場合は、Webスクレイピングになる)
    - 口コミは関連性と新しい順で取得することができる(アルゴリズムはブラックボックス)
    - コメントのいいねは取得できない。
- [PlacePhoto](https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto)
     - 最大取得件数10件(10件以上取得する場合は、Webスクレイピングになる)
     - Google Map(ALL)から取得されている

### NearBySearch
■概要
[Nearby Search](https://developers.google.com/maps/documentation/places/web-service/search-nearby) ：指定されたエリア内の場所を検索できます。キーワードを指定するか、検索する場所のタイプを指定して、検索リクエストを絞り込むことができる.

■仕様
- 1リクエストで20件取得できる。3ページに渡って最大60件まで取得でき、その場合はpagetokenを指定して次の20件を取得する。
    - 20件のうち、初めと最後のデータは立地場所に関する情報になる。 
- 現在地から5km以内の場所を取得可能（取得場所はGoogleインデックスのランキング、世界的な人気、その他要素によって決定される）

###  PlaceSearch
- 箱崎、赤坂の場所検索をすると、どちらも東京の住所が返ってくることを確認した。
- 地名、及び住所からの検索は可能である。しかし、緯度・経度から場所をはっきりさせる場合は、Geocoding APIを使う必要がある。
    - 例：八王子駅（JRと京王）の場合、駅名は同じなのに異なる場所に位置するため、正確な情報を取得できない。

## 参考資料
- [Google Places APIを使って地図上の口コミを分析する方法](https://gaaaon.jp/blog/google_map_api)
