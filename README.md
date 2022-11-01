# Googlemap-Comment
## 事前準備
Google Platform Map APIを使えるようにする
https://developers.google.com/maps?hl=ja

## 実装メモ
- PlaceIDを取得しないとレビューと写真が取れない

## Todo
- 座標から取得ができるようにする
    - GeoCodingAPIを利用する
    - PlaceAPIからは取得ができない
- ランドマークの情報から半径Xm以内の場所を抽出できるか検証する

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

## 参考資料
- [Google Places APIを使って地図上の口コミを分析する方法](https://gaaaon.jp/blog/google_map_api)
