import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import TSnePlotWidget from '../src/TSnePlotWidget.js'
import TSnePlotView from 'expression-atlas-experiment-page-tsne-plot'

describe(`TSnePlotWidget`, () => {

  test(`weather showControl prop is true or false`, () => {
    const experimentAccession = `E-MTAB-5061`
    const speciesName = `Homo Sapiens`

    const onChangeColourBy = () => {}
    const onChangePerplexity = () => {}
    const plotData = {
      series: []
    }

    const wrapper = mount(<TSnePlotWidget speciesName={speciesName} experimentAccession={experimentAccession} ks={[]} metadata={[]} selectedColourBy={`0`} onChangeColourBy={onChangeColourBy} perplexities={[]} selectedPerplexity={0} onChangePerplexity={onChangePerplexity} loading={true} plotData={plotData}/>)

    const tSnePlotView = wrapper.find(TSnePlotView)

    expect(tSnePlotView.props().showControls).toBe(false)
  })

  test(`matches snapshot`, () => {
    const experimentAccession = `E-MTAB-5061`
    const speciesName = `Homo Sapiens`

    const onChangeColourBy = () => {}
    const onChangePerplexity = () => {}
    const plotData = {
      series: []
    }

    const tree = renderer
      .create(<TSnePlotWidget speciesName={speciesName} experimentAccession={experimentAccession} ks={[]} metadata={[]} selectedColourBy={`0`} onChangeColourBy={onChangeColourBy} perplexities={[]} selectedPerplexity={0} onChangePerplexity={onChangePerplexity} loading={true} plotData={plotData}/>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
