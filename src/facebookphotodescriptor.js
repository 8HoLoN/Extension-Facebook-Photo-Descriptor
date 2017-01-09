const emoji_map = {
    "1 person": "👤",
    "2 people": "👥",
    "airplane": "✈️",
    "baby": "🍼",
    "baseball": "⚾️",
    "beach": "🏖",
    "beard": "👴",
    "bedroom": "🛏",
    "bicycle": "🚲",
    "camera": "📷",
    "car": "🚗",
    "cat": "😺",
    "child": "👦",
    "christmas tree": "🎄",
    "close-up": "👀",
    "closeup": "👀",
    "cloud": "☁️",
    "concert": "🎤",
    "crowd": "👥",
    "dancing": "💃",
    "dessert": "🍰",
    "dog": "🐶",
    "drink": "🍹",
    "eating": "🍽",
    "eyeglasses": "👓",
    "fire": "🔥",
    "fireworks": "🎆",
    "flower": "🌻",
    "food": "🍎",
    "glasses": "🕶",
    "golf": "🏌️‍",
    "grass": "🍃",
    "hat": "👒",
    "indoor": "🏠",
    "laptop": "💻",
    "living room": "🏠",
    "meme": "👍",
    "motorcycle": "🏍",
    "mountain": "🌋",
    "nature": "🏞",
    "night": "🌃",
    "ocean": "🌊",
    "office": "💼",
    "one or more people": "👥",
    "outdoor": "🚵",
    "people eating": "🍽",
    "people on stage": "🎤",
    "people playing musical instruments": "🎸",
    "people playing sport": "🏀",
    "people sitting": "⑁",
    "people sleeping": "💤",
    "people smiling": "😂",
    "people standing": "🕴",
    "phone": "📱",
    "plant": "🌿",
    "playing a musical instrument": "🎸",
    "screen": "🖥",
    "selfie": "🤳",
    "shoes": "👡",
    "sitting": "⑁",
    "sky": "☀️",
    "skyscraper": "🏙",
    "sleeping": "😴",
    "smiling": "😋",
    "snow": "❄️",
    "stadium": "🏟",
    "standing": "🕴",
    "stripes": "📶",
    "suit": "🕴",
    "sunglasses": "🕶",
    "swimming": "🏊",
    "table": "🍽",
    "text": "🔠",
    "tree": "🌴",
    "twilight": "🌃",
    "water": "💧",
    "wedding": "💒"
};

(function(){
    "use strict";
    function Fpd(){
        const that = this;
        const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                        //console.log("new");
                        that.show();
                });
        });

        const config = { attributes: true, childList: true, characterData: false };

        observer.observe(document.body, config);

        that.show();
    }

    Fpd.prototype.show = function(){
        let _photos = [...document.getElementsByTagName('img')];

        _photos = _photos.filter((_x)=>{
            return !_x.hasAttribute("data-prev-alt") || ( _x.getAttribute("data-prev-alt") !== _x.getAttribute("alt") );
        }).filter((_x)=>{
            return !!~_x.alt.indexOf(':');
        });

        _photos.map(function(_x){
            const altText = _x.alt.split(': ')[1];
            // us,uk,fr,de,es
            const tags = altText.split(/, | and | und | et | e /);

            let html = "<ul style='position:absolute;top:10px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:rgba(0,0,0,0.7);color:#fff;border-radius:5px'>";
            tags.forEach(function(tag){
                        let prefix = "∙";
                        //console.log(tag);

                        if (tag in emoji_map) {
                            prefix = emoji_map[tag];
                        } else if (tag.endsWith('people')) {
                            prefix = emoji_map['2 people'];
                        }

                        html += `<li>${prefix} ${tag}</li>`;
                    });
            html += "</ul>";

            //console.log(altText);
            _x.style.position = 'relative';
            _x.insertAdjacentHTML('afterend', html);
        });
    };

    const fpd = new Fpd();
})();
