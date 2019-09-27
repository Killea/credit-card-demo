import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'

import ShopBodyPayment from '@/components/ShopBodyPayment.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

const cardHolderNamePureNumber = 2222222221111

const masterGood = '5490499495563199'
const visaGood = '4035300539804083'
const amexGood = '378868637988407'

const randomCardWrong = '124567'

const wrongMon = ['-1', '*', '0', '22', '☹️']

describe('💡Click Checkout Button', () => {
  it('☹️Input Nothing', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })
    let button = wrapper.find('.submitButton')
    button.trigger('click')
    // let message = wrapper.find('.el-message-box__message')
    // console.log(wrapper.vm.errText.errCardHolderName)
    expect(wrapper.vm.errText.errCardHolderName).toBe(
      `Please input the card holder's name`
    )
  })
})

describe('💡Click Checkout Button', () => {
  it('☹️Input Card holder name as pure numbers', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrapper.find('#card-holder-name').setValue(cardHolderNamePureNumber)

    let button = wrapper.find('.submitButton')
    button.trigger('click')
    console.log(wrapper.vm.errText.errCardHolderName)
    expect(wrapper.vm.errText.errCardHolderName).toBe(
      `Please check the card holder's name, cannot be a number`
    )
  })
})

describe('💡Click Checkout Button', () => {
  it('☹️Input a wrong Card Number', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrapper.find('#card-number').setValue(randomCardWrong)
    let button = wrapper.find('.submitButton')
    button.trigger('click')
    expect(wrapper.vm.errText.errCardNumber).toBe(
      `This card is not supported, please check your card number`
    )
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input a correct Master Card Number', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrapper.find('#card-number').setValue(masterGood)
    let button = wrapper.find('.submitButton')
    button.trigger('click')
    expect(wrapper.vm.errText.errCardNumber).toBe('')
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input a correct Visa Card Number', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrapper.find('#card-number').setValue(visaGood)
    let button = wrapper.find('.submitButton')
    button.trigger('click')
    expect(wrapper.vm.errText.errCardNumber).toBe('')
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input a correct Visa Card Number', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrapper.find('#card-number').setValue(amexGood)
    let button = wrapper.find('.submitButton')
    button.trigger('click')
    expect(wrapper.vm.errText.errCardNumber).toBe('')
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input a wrong month', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })
    wrapper.find('#card-number').setValue(amexGood)
    let button = wrapper.find('.submitButton')
    button.trigger('click')
    expect(wrapper.vm.errText.errMon).toBe('')
  })
})
