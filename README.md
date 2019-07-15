# Single Cell Experssion Atlas t-SNE widget
[![Build Status](https://travis-ci.com/ebi-gene-expression-group/scxa-tsne-widget.svg?branch=master)](https://travis-ci.com/ebi-gene-expression-group/scxa-tsne-widget) [![Coverage Status](https://coveralls.io/repos/github/ebi-gene-expression-group/scxa-tsne-widget/badge.svg?branch=master)](https://coveralls.io/github/ebi-gene-expression-group/scxa-tsne-widget?branch=master)

An easy-to-embed React component to visualise t-SNE plots from Single Cell Expression Atlas.

The widget is designed to show tsne plots for experiment data. It has one dropdown control `Color By` which can be used to color plot by `metadata`.

# Build and test
1. Install dependencies with NPM or your package manager of choice.
2. `npx webpack-dev-server`
3. Browse over to `http://localhost:9000`


# API
## React
If you install the component through your package manager of choice and include it as a React component, you need to
specify two props to determine what combination of experiment/gene to display. Additionally, there are a few optional
props to customise the presentation and layout.

### Required props
|         Name        |   Type   |                             Comment                                  |
| ------------------- | -------- | -------------------------------------------------------------------- |
| experimentAccession | `string` | Accession of the experiment you want to visualise                    |
| geneId              | `string` | Ensembl gene ID for which to show expression (can be left out empty) |

## Optional props
|           Name          |   Type   |         Default value      | Comment |
| ----------------------- | -------- | -------------------------- | ------- |
| wrapperClassName        | `string` | `row expanded`             | Wrapper class from the [EBI Visual Framework](https://github.com/ebiwd/EBI-Framework) (a [Foundation](https://foundation.zurb.com/sites.html) flavour) that takes all available horizontal space |
| clusterPlotClassName    | `string` | `small-12 large-6 columns` | Grid settings that uses half width in small and medium-sized screens and half width in large screens |
| expressionPlotClassName | `string` | `small-12 large-6 columns` | |
| height                  | `number` | 800                        | The plots are square-sized if the page is wide enough |

### Example
```jsx
import React from 'react'
import TSnePlotWidget from 'ebi-scea-tsne-widget'

...

<TSnePlotWidget
  experimentAccession={`E-ENAD-15`}
  geneId={`ENSMUSG00000041147`}
/>  
```


## JavaScript widget
If you only want to show the widget on your website, we provide a convenience `render` method that takes an element ID
where to mount the component plus an options object that encapsulates the props described above.

### Bundling
After installing dependencies run Webpack to create your JS bundles: `npx webpack -p`*

* `-p` creates production bundles, without console messages. Replace it with `-d` if you want to see more nitty-gritty
  details

You will need to include these two JS scripts in your page:
```html
<script src="../dist/vendors.bundle.js"></script>
<script src="../dist/TSnePlotWidgetDemo.bundle.js"></script>
```

### Example
```html
<script>
  TSnePlotWidgetDemo.render({
    experimentAccession: 'E-MTAB-5061',
    geneId: 'ENSMUSG00000041147'
  }, 'target')
</script>
```

You can see how this looks on
[our example page](https://github.com/ebi-gene-expression-group/scxa-tsne-widget/blob/master/html/index.html).

# Caveats
## Highcharts
We use [Highcharts](https://www.highcharts.com/) as our plotting library and
[React Select](https://react-select.com/home) to render the colouring drop-down. Here are useful styles with some
comments to make all display fine. Scope them if you need to if they clash with yours:
```css
/* Override EBI VF styles for components that use React-Select */
input {
  height: unset;
  box-shadow: none;
  margin: 0;
}

/* Fix for Highcharts tooltip being cut off */
.highcharts-container {
  overflow: visible !important;
}
svg {
  overflow: visible !important;
}

/* Match margin set by React Select component */
.gene-search-container {
  margin-bottom: 1rem;
}
```

## EBI Visual Framework
If you want to include the EBI Visual Framework to take advantage of the default visual settings, you should include at
least these two CSS files in your environment:
```html
<link rel="stylesheet" href="https://www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/libraries/foundation-6/css/foundation.css" type="text/css" media="all" />
<link rel="stylesheet" href="https://www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/css/ebi-global.css" type="text/css" media="all" />
```

[Read more bout the EBI Visual Framework here](https://www.ebi.ac.uk/style-lab/).
