import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {shallow, mount, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import MyComponent from '../src/MyComponent.js'

Enzyme.configure({ adapter: new Adapter() })

describe(`MyComponent`, () => {
  test(`should render without throwing an error`, () => {
     expect(shallow(<MyComponent />).contains(<div className="foo">Bar</div>)).toBe(true)
  })

  test(`should be selectable by class "foo"`, () => {
    expect(shallow(<MyComponent />).is(`.foo`)).toBe(true)
  })

  test(`should mount in a full DOM`, () => {
    expect(mount(<MyComponent />).find(`.foo`)).toHaveLength(1)
  })

  test(`should render to static HTML`, () => {
    expect(render(<MyComponent />).text()).toEqual(`Bar`)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<MyComponent />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
