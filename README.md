# scxa-tsne-widget

The widget is designed to show tsne plots for experiment data. It has one dropdown control `Color By` which can be used to color plot by `metadata`.

The widget takes `2` mandatory parameters i.e. `Experiment Accession` and `Gene Id`.

To use widget it in your webpage you will need to add it to html as a `script`. Here is an example:

```html
<script defer src="../dist/TSnePlotWidgetDemo.bundle.js"></script>

<!-- Set to http://localhost:8080/gxa/ or http://localhost:8080/gxa_sc/ -- Remember the trailing slash! -->
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    TSnePlotWidgetDemo.render({
      experimentAccession: 'E-MTAB-5061',
      geneId: 'ENSMUSG00000041147'
    }, 'target')
  })
</script>
```
