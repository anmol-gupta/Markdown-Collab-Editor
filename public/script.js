window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');   
    var previousMDvalue;

    pad.addEventListener('keydown',(e) => {
        if(e.keyCode === 9) { // tab was pressed
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value;

            target.value = value.substring(0, start)
                            + "\t"
                            + value.substring(end);

            this.selectionStart = this.selectionEnd = start + 1;

            e.preventDefault();
        }
    });

    var convertTextAreaToMarkdown = () => {
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = () => {
        if(previousMDvalue!=pad.value){
            return true;
        }
        return false;
    }

    setInterval(() => {
        if(didChangeOccur){
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    if(document.location.pathname.length > 1){
        // implement share js
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });        
    }
    convertTextAreaToMarkdown();
};