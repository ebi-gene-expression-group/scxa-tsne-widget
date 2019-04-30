import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import TSnePlotView from 'expression-atlas-experiment-page-tsne-plot'

class TSnePlotWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      metadata: [],
      selectedColourBy: `characteristic_inferred_cell_type`,
      selectedColourByCategory: `metadata`,
      metadataErrorMessage: null,
      loadingMetadata: false,
    }
  }

  async _fetchAndSetState(resource, baseUrl, dataField, errorMessageField, loadingField) {
    this.setState({
      [loadingField]: true
    })

    const url = URI(resource, baseUrl).toString()

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`${url} => ${response.status}`)
      }

      this.setState({
        [dataField]: await response.json(),
        [errorMessageField]: null,
        [loadingField]: false,
      })

      if(this.state.metadata.length === 0) {
        this.setState({
          selectedColourBy: `7`,
          selectedColourByCategory: `clusters`
        })
      }
    } catch (e) {
      this.setState({
        [errorMessageField]: `${e.name}: ${e.message}`,
        [loadingField]: false
      })
    }
  }

  _fetchAndSetStateMetadata(
    {atlasUrl, experimentAccession}) {
    const resource = `json/experiments/${experimentAccession}/metadata`

    this._fetchAndSetState(
      resource, atlasUrl, `metadata`, `metadataErrorMessage`, `loadingMetadata`) // this will work once backend code is merged in sc atlas. In meantime, it will not fetch metadata option as there is no endpoint currently in sc atlas
  }

  _onChangeColourBy(colourByCategory, colourByValue) {
    this.setState({
      selectedColourBy: colourByValue
    })
  }

  componentDidMount() {
    this._fetchAndSetStateMetadata(this.props)
  }

  render() {

    const {height, atlasUrl, suggesterEndpoint} = this.props
    const {wrapperClassName, clusterPlotClassName, expressionPlotClassName} = this.props
    const {geneId, speciesName, highlightClusters, experimentAccession} = this.props
    const {ks, perplexities, selectedPerplexity} = this.props
    const {selectedColourBy, metadata, selectedColourByCategory} = this.state

    return (
      <div>
        <div>
          <TSnePlotView
            atlasUrl={atlasUrl}
            suggesterEndpoint={suggesterEndpoint}
            wrapperClassName={wrapperClassName}
            clusterPlotClassName={clusterPlotClassName}
            expressionPlotClassName={expressionPlotClassName}
            speciesName={speciesName}
            experimentAccession={experimentAccession}
            ks={ks} // for future use
            metadata={metadata}
            selectedColourBy={selectedColourBy} // used default k value as we are not showing widget controls for now
            selectedColourByCategory={selectedColourByCategory} // Is the plot coloured by clusters or metadata (as we not showing controls so used 'clusters' as default selected category
            highlightClusters={highlightClusters} //future use
            perplexities={perplexities}
            selectedPerplexity={selectedPerplexity} //default value given for now
            geneId={geneId}
            height={height}
            onSelectGeneId={() => {
            }} //for future use
            onChangePerplexity={() => {
            }} //for future use
            onChangeColourBy={(colourByCategory, colourByValue) =>
              this._onChangeColourBy(colourByCategory, colourByValue)
            }
            showControls={false} // flag to control weather controls over tsne plots are shown or not
          />
        </div>
        <div>
          To know more about this experiment go to <a target={`_blank`} href={`https://www.ebi.ac.uk/gxa/sc/experiments/` + experimentAccession}> Single Cell Expression Atlas</a>
        </div>
      </div>
    )
  }
}

TSnePlotWidget.propTypes = {
  atlasUrl: PropTypes.string,
  wrapperClassName: PropTypes.string,
  clusterPlotClassName: PropTypes.string,
  expressionPlotClassName: PropTypes.string,
  experimentAccession: PropTypes.string.isRequired,
  geneId: PropTypes.string.isRequired,
  perplexities: PropTypes.arrayOf(PropTypes.number),
  selectedPerplexity: PropTypes.number,
  ks: PropTypes.arrayOf(PropTypes.number),
  suggesterEndpoint: PropTypes.string,
  speciesName: PropTypes.string,
  height: PropTypes.number,
  highlightClusters: PropTypes.arrayOf(PropTypes.number),
}


TSnePlotWidget.defaultProps = {
  atlasUrl: `https://www.ebi.ac.uk/gxa/sc/`,      //no options will be shown until new metadata endpoint is implemented in prod/ to test change it to localhost
  suggesterEndpoint: `json/suggestions`,
  wrapperClassName: `row expanded`,
  clusterPlotClassName: `small-12 large-6 columns`,
  expressionPlotClassName: `small-12 large-6 columns`,
  speciesName: ``,
  height: 800,
  selectedPerplexity: 15,
  ks: [],
  perplexities: [],
  highlightClusters: []
}

export default TSnePlotWidget
