// レンダリング初期設定
const script = document.createElement('script');
script.src =`https://maps.googleapis.com/maps/api/js?\
    key=${apikey}&callback=initMap&libraries=places&v=weekly`; //関数などで処理したものでもOK
script.setAttribute('defer', true);
document.body.appendChild(script);