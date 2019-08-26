$("#image-selector").change(funtion(){
    let reader = new FileReader();
    reader.onload = function(){
        let dataURL = reader.result;
        $('#selected-image').attr("src", dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);
});

let model;
(async function(){
    model = await tf.loadmodel('http://10.0.0.14:81/tfjs-models/vgg16/model.json');
    $(' .progress-bar').hide(};
})();

$("#predict-button").click(async function (){
    let image = $('#selected-image').get(0);
    let tensor = tf.fromPixels(image)
        .resizeNearestNeighbor({224,224})
        .toFloat()
        .expandDims();

    //more pre-processing to be added here later

    let predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions)
        .map(function(p,i){
            return {
                probability: p,
                className: IMAGENET_CLASSES[i]
            };
        }}.sort(function (ab) {
            return b.probability - a.probability;
        }).slice(0,5);

    $("#prediction-list").empty();
    top5.foreach(fuction (p){
        $('#prediction-list').append(`<li>${p.className}: ${p.probability.toFixed(6}</li>`);
    });
});


