import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'

import ShopBodyPayment from '@/components/ShopBodyPayment.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

const cardHolderNamePureNumber = '22222222111'

const oneGoodName = 'Tom Good'
const masterGood = '5490499495563199'
const visaGood = '4035300539804083'
const amexGood = '378868637988407'

const randomCardWrong = '124567'

const wrongMon = ['-1', '*', '0', '22', '☹️']
const correctMon = ['1', '2', '3', '4', '5', '07', '08', '09', '10']

const wrongYear = ['1999', 'A27', '2018']
const correctYear = ['2025', '2030']

const correctCardInfo = [
  {
    cvc: '123',
    number: '5490499495563199',
    type: 'master',
    mon: '12',
    year: '2030'
  },
  {
    cvc: '123',
    number: '4035300539804083',
    type: 'visa',
    mon: '12',
    year: '2030'
  },
  {
    cvc: '5678',
    number: '378868637988407',
    type: 'amex',
    mon: '12',
    year: '2030'
  }
]

const wrongCardInfo = [
  {
    cvc: '1234',
    number: '5490499495563199',
    type: 'master',
    mon: '12',
    year: '2030'
  },
  {
    cvc: '1=3',
    number: '4035300539804083',
    type: 'visa',
    mon: '12',
    year: '2030'
  },
  {
    cvc: '***',
    number: '378868637988407',
    type: 'amex',
    mon: '12',
    year: '2030'
  }
]

describe('💡Click Checkout Button', () => {
  it('☹️Input Nothing', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })
    let button = wrapper.find('.submitButton')
    button.trigger('click')

    expect(wrapper.vm.errText.errCardHolderName).toBe(
      `Please input the card holder's name`
    )

    expect(wrapper.vm.errText.errCardNumber).toBe(
      `Please input the card number`
    )

    expect(wrapper.vm.errText.errMon).toBe(`Please input correct expiry month`)
    expect(wrapper.vm.errText.errYear).toBe(`Please input correct expiry year`)
    expect(wrapper.vm.errText.errCVC).toBe(`Please input correct cvc`)
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input everything correctly!', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrapper.find('#card-holder-name').setValue(oneGoodName)
    wrapper.find('#card-number').setValue(correctCardInfo[0].number)
    wrapper.find('#month').setValue(correctCardInfo[0].mon)
    wrapper.find('#year').setValue(correctCardInfo[0].year)
    wrapper.find('#cvc').setValue(correctCardInfo[0].cvc)


    let button = wrapper.find('.submitButton')
    button.trigger('click')

    expect(wrapper.vm.errText.errCardHolderName).toBe('')
    expect(wrapper.vm.errText.errCardNumber).toBe('')
    expect(wrapper.vm.errText.errMon).toBe('')
    expect(wrapper.vm.errText.errYear).toBe('')
    expect(wrapper.vm.errText.errCVC).toBe('')
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
  it('☹️Input a wrong month', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrongMon.forEach(element => {
      wrapper.find('#month').setValue(element)
      let button = wrapper.find('.submitButton')
      button.trigger('click')
      expect(wrapper.vm.errText.errMon).toBe(
        'Please input correct expiry month'
      )
    })
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input a correct month', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    correctMon.forEach(element => {
      wrapper.find('#month').setValue(element)
      let button = wrapper.find('.submitButton')
      button.trigger('click')
      expect(wrapper.vm.errText.errMon).toBe('')
    })
  })
})

describe('💡Click Checkout Button', () => {
  it('☹️Input a wrong year', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrongYear.forEach(element => {
      wrapper.find('#year').setValue(element)
      let button = wrapper.find('.submitButton')
      button.trigger('click')

      expect(
        wrapper.vm.errText.errYear === 'Your card expiried' ||
          wrapper.vm.errText.errYear === 'Please input correct expiry year'
      ).toBeTruthy()
    })
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input a correct year', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    correctYear.forEach(element => {
      wrapper.find('#year').setValue(element)
      let button = wrapper.find('.submitButton')
      button.trigger('click')
      expect(wrapper.vm.errText.errYear === '').toBeTruthy()
    })
  })
})

describe('💡Click Checkout Button', () => {
  it('😃Input a correct cvv and correct card', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    correctCardInfo.forEach(element => {
      wrapper.find('#card-number').setValue(element.number)
      wrapper.find('#cvc').setValue(element.cvc)
      let button = wrapper.find('.submitButton')
      button.trigger('click')
      expect(wrapper.vm.errText.errCVC).toBe('')
    })
  })
})

describe('💡Click Checkout Button', () => {
  it('☹️😃Input a wrong cvv but correct card', () => {
    const wrapper = mount(ShopBodyPayment, {
      localVue
    })

    wrongCardInfo.forEach(element => {
      wrapper.find('#card-number').setValue(element.number)
      wrapper.find('#cvc').setValue(element.cvc)
      let button = wrapper.find('.submitButton')
      button.trigger('click')
      expect(wrapper.vm.errText.errCVC).toBe('Please input correct cvc')
    })
  })
})
