import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import TSnePlotView from 'expression-atlas-experiment-page-tsne-plot'

class TSnePlotWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plotdata: {
        metadata: [],
        perplexities: []
      },
      selectedColourBy: `inferred_cell_type`,
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

      if (!(this.state.plotdata.metadata.indexOf(`inferred_cell_type`) > -1)) {
        this.setState({
          selectedColourBy: this.state.plotdata.metadata[0].value //selects first element of metadata array if inferred_cell_type is not present
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
    const resource = `json/experiments/${experimentAccession}/metadata/tsneplot`

    this._fetchAndSetState(
      resource, atlasUrl, `plotdata`, `metadataErrorMessage`, `loadingMetadata`) // this will work once backend code is merged in sc atlas. In meantime, it will not fetch metadata option as there is no endpoint currently in sc atlas
  }

  _onChangeColourBy(colourByCategory, colourByValue) {
    this.setState({
      selectedColourBy: colourByValue,
      selectedColourByCategory: colourByCategory
    })
  }

  componentDidMount() {
    this._fetchAndSetStateMetadata(this.props)
  }

  render() {
    const {height, atlasUrl, suggesterEndpoint} = this.props
    const {wrapperClassName, clusterPlotClassName, expressionPlotClassName} = this.props
    const {geneId, speciesName, ks, experimentAccession} = this.props
    const {metadata, perplexities} = this.state.plotdata
    const {selectedColourBy, selectedColourByCategory, loadingMetadata} = this.state

    const perplexitiesOrdered = perplexities.sort((a, b) => a - b)

    return (
      loadingMetadata ?
        <p className={`row column loading-message`}>Loading, please wait…</p> :
        <React.Fragment>
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
            perplexities={perplexities}
            selectedPerplexity={perplexitiesOrdered[Math.round((perplexitiesOrdered.length - 1) / 2)]} //default value given for now
            geneId={geneId}
            height={height}
            onChangeColourBy={(colourByCategory, colourByValue) =>
              this._onChangeColourBy(colourByCategory, colourByValue)
            }
            showControls={false} // flag to control weather controls over tsne plots are shown or not
          />
          <p>
            To know more about this experiment please go to <a target={`_blank`} href={`https://www.ebi.ac.uk/gxa/sc/experiments/${experimentAccession}`}>Single Cell Expression Atlas </a>.
          </p>
        </React.Fragment>
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
  ks: PropTypes.arrayOf(PropTypes.number),
  suggesterEndpoint: PropTypes.string,
  speciesName: PropTypes.string,
  height: PropTypes.number
}


TSnePlotWidget.defaultProps = {
  atlasUrl: `http://localhost:8080/gxa/sc/`,      //no options will be shown until new metadata endpoint is implemented in prod/ to test change it to localhost
  suggesterEndpoint: `json/suggestions`,
  wrapperClassName: `row expanded`,
  clusterPlotClassName: `small-12 large-6 columns`,
  expressionPlotClassName: `small-12 large-6 columns`,
  speciesName: ``,
  height: 800,
  ks: []
}

export default TSnePlotWidget
