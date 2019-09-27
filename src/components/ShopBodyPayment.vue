<template>
  <div>
    <el-row>
      <el-col :span="11">
        <div class="shopbody-payment-product">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->

            <swiper-slide v-for="item in productPix" :key="item" style="margin-top:40px">
              <img :src="item" style="width:80%;cursor: grab; " />
            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>

          <div style="margin-top:20px">
            <span>{{productName}}</span>
          </div>

          <div class="shopbody-payment-info">
            <div style>To pay</div>
            <span class="shopbody-payment-price">{{productPrice}}</span>
            <span class="shopbody-payment-currency">{{productCurrency}}</span>
            <div class="shopbody-payment-productspec-item" v-for="item in productSpec">{{item}}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="13">
        <el-form
          :label-position="top"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="product-ruleForm"
        >
          <div class="shopbody-payment-credit">
            <div style="font-size:3em;font-weight: bold;margin-left:-2px">Payment details</div>

            <div style="margin-top:20px;">Fill in the info below to continue.</div>

            <div style="margin-top:60px">
              <el-form-item label="Cardholder name" prop="cardholderName">
                <el-input
                  id="card-holder-name"
                  v-model="ruleForm.cardholderName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="Card Number" prop="cardNumber">
                <el-input
                  id="card-number"
                  v-model="ruleForm.cardNumber"
                  autocomplete="off"
                  @change="formatCardNumber"
                  ref="cardNumber"
                >
                  <i slot="prefix" v-if="cardType==''" class="el-input__icon el-icon-bank-card"></i>

                  <i slot="prefix" v-if="cardType=='Mastercard'">
                    <img class="shopbody-payment-card-prefix" src="mastercard.png" alt />
                  </i>

                  <i slot="prefix" v-if="cardType=='Visa'">
                    <img class="shopbody-payment-card-prefix" src="visa.png" alt />
                  </i>

                  <i slot="prefix" v-if="cardType=='American Express'">
                    <img class="shopbody-payment-card-prefix" src="amex.png" alt />
                  </i>
                </el-input>
              </el-form-item>

              <el-row style="margin-top:30px">
                <el-col :span="9">
                  <el-form-item label="Expiry month" prop="expiryMonth">
                    <el-input id= 'month' style="width:90%" v-model="ruleForm.expiryMonth" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="9">
                  <el-form-item label="Expiry year" prop="expiryYear">
                    <el-input id = 'year' style="width:90%" v-model="ruleForm.expiryYear" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="CVC/CVV" prop="cvc">
                    <el-input id ='cvc' v-model="ruleForm.cvc" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-button
                class="submitButton"
                type="primary"
                @click="submitForm('ruleForm')"
                style="width:100%;font-size:20px;margin-top:30px"
              >Checkout</el-button>
            </div>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    // It might be uncommon that an online shop can support ALL types of cards, here define 3 common ones
    // all supported card types https://github.com/bendrucker/creditcards-types/tree/master/types
    // This is a card number genarator for testing, https://ccard-generator.com/

    var visa = require("creditcards-types/types/visa");
    var mastercard = require("creditcards-types/types/mastercard");
    var americanExpress = require("creditcards-types/types/american-express");

    var validateCardholderName = (rule, value, callback) => {
      this.errText.errCardHolderName = "";
      if (!value) {
        this.errText.errCardHolderName = "Please input the card holder's name";
        return callback(new Error(this.errText.errCardHolderName));
      }
      var n = Number(value);
      if (!isNaN(n)) {
        this.errText.errCardHolderName =
          "Please check the card holder's name, cannot be a number";
        return callback(new Error(this.errText.errCardHolderName));
      }

      callback();
    };

    var validateCreditCardNumber = (rule, value, callback) => {
      this.errText.errCardNumber = "";
      let cardNumber = value;
      if (!cardNumber) {
        this.errText.errCardNumber = "Please input the card number";
        return callback(new Error(this.errText.errCardNumber));
      }

      // delete space (\u0020) in the card number
      cardNumber = cardNumber.replace(/\u0020/g, "");

    
      if (visa.test(cardNumber)) {
       // console.log("Visa!");
        this.cardType = "Visa";
        return callback();
      }

      if (mastercard.test(cardNumber)) {
       // console.log("mastercard!");
        this.cardType = "Mastercard";
        return callback();
      }

      if (americanExpress.test(cardNumber)) {
       // console.log("americanExpress!");
        this.cardType = "American Express";
        return callback();
      }
      this.cardType = "";

      this.errText.errCardNumber =
        "This card is not supported, please check your card number";
      return callback(new Error(this.errText.errCardNumber));
    };

    var expiration = require("creditcards/expiration");

    var validateExpiryMonth = (rule, value, callback) => {
      this.errText.errMon = "";
      if (!value || value == 0) {
        this.errText.errMon = "Please input correct expiry month";
        return callback(new Error(this.errText.errMon));
      }

      if (
        expiration.isPast(
          this.ruleForm.expiryMonth,
          this.ruleForm.expiryYear
        ) &&
        this.ruleForm.expiryYear != ""
      ) {
        this.errText.errMon = "Your card expiried";
        return callback(new Error(this.errText.errMon));
      }

      callback();
    };

    var validateExpiryYear = (rule, value, callback) => {
      this.errText.errYear = "";
      if (!value) {
        this.errText.errYear = "Please input correct expiry year";
        return callback(new Error(this.errText.errYear));
      }
      if (
        expiration.isPast(
          this.ruleForm.expiryMonth,
          this.ruleForm.expiryYear
        ) &&
        this.ruleForm.expiryYear != ""
      ) {
        this.errText.errYear = "Your card expiried";
        return callback(new Error(this.errText.errYear));
      }

      callback();
    };

    var validatecvc = (rule, value, callback) => {
      this.errText.errCVC = "";

      if (!value) {
        this.errText.errCVC = "Please input correct cvc";
        return callback(new Error(this.errText.errCVC));
      }
      var Cvc = require("creditcards/cvc");
      var types = require("creditcards-types");
      var cvc = Cvc(types);
      if (!cvc.isValid(this.ruleForm.cvc, this.cardType)) {
        this.errText.errCVC = "Please input correct cvc";
        return callback(new Error(this.errText.errCVC));
      }

      callback();
    };

    return {
      // product data should be from the backend
      productName: "13-inch MacBook Pro -Space Gray",
      productPrice: 2399.99,
      productCurrency: "CAD",
      productSpec: {
        cpu: "Intel Core i9 3.3GHz",
        memory: "32GB memory",
        hardDrive: "512GB SSD storage"
      },
      productPix: ["a.png", "b.png"],
      // card info will send to backend
      ruleForm: {
        cardholderName: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: ""
      },
      cardType: "",
      // swiper settings
      swiperOption: {
        effect: "flip",
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      errText: {
        errCardHolderName: "",
        errCardNumber: "",
        errMon: "",
        errYear: "",
        errCVC: ""
      },
      // form validation rules
      rules: {
        cardholderName: [
          {
            required: true,
            validator: validateCardholderName,
            trigger: "blur"
          },
          {
            min: 1,
            max: 128,
            message: "length from 1 to 128 letters",
            trigger: "blur"
          }
        ],

        cardNumber: [
          {
            required: true,
            validator: validateCreditCardNumber,
            trigger: "blur"
          }
        ],
        expiryMonth: [
          {
            required: true,
            validator: validateExpiryMonth,
            trigger: "blur"
          }
        ],

        expiryYear: [
          { required: true, validator: validateExpiryYear, trigger: "blur" }
        ],
        cvc: [{ required: true, validator: validatecvc, trigger: "blur" }]
      }
    };
  },
  methods: {
    // formatCardNumber, to format the number string
    // from https://cloud.tencent.com/developer/article/1352349
    formatCardNumber() {
      const cardNumber = this.ruleForm.cardNumber;
      const input = this.$refs.cardNumber;
      const cursorIndex = input.selectionStart;
      // How many space-letter before the cursor in the string
      const lineNumOfCursorLeft = //\u0020 means space in Unicode
      (cardNumber.slice(0, cursorIndex).match(/\u0020/g) || []).length;
      // get rid of all the space-letters
      const noLine = cardNumber.replace(/\u0020/g, "");
      // get rid of wrong letters and insert space-letter
      const newCardNum = noLine
        .replace(/\D+/g, "")
        .replace(/(\d{4})/g, "$1\u0020")
        .replace(/\u0020$/, "");
      // change the amount of the space-letters before cursor in the string
      const newLineNumOfCursorLeft = (
        newCardNum.slice(0, cursorIndex).match(/\u0020/g) || []
      ).length;
      // set cursor to correct position
      const newCursorIndex =
        cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft;
      // new value, nextTick make sure the space-letter cannot be input manually
      this.$nextTick(() => {
        this.ruleForm.cardNumber = newCardNum;
        this.$nextTick(() => {
          // selectionStart、selectionEnd
          input.selectionStart = newCursorIndex;
          input.selectionEnd = newCursorIndex;
        });
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$alert("😀Everything is great!", "Success", {
            confirmButtonText: "OK",
            callback: null
          });
        } else {
          this.$alert(
            "☹️There's some thing wrong, please check the form!",
            "Error",
            {
              confirmButtonText: "OK",
              callback: null
            }
          );

          return false;
        }
      });
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {
    "ruleForm.expiryMonth"(newVal, oldVal) {
      this.ruleForm.expiryMonth = newVal.replace(/[^0-9]/gi, "");
      if (newVal < 0 || newVal > 12) {
        this.ruleForm.expiryMonth = oldVal;
      }
    },
    "ruleForm.expiryYear"(newVal, oldVal) {
      let thisYear = new Date().getFullYear();

      this.ruleForm.expiryYear = newVal.replace(/[^0-9]/gi, "");

      if (
        newVal.length > 4 ||
        newVal > 2099 ||
        (newVal.length == 4 && newVal < thisYear)
      ) {
        this.ruleForm.expiryYear = oldVal;
      }
    },
    "ruleForm.cvc"(newVal, oldVal) {
      this.ruleForm.cvc = newVal.replace(/[^0-9]/gi, "");
      if (newVal.length > 4) {
        this.ruleForm.cvc = oldVal;
      }
    }
  }
};
</script>


<style>
.shopbody-payment-credit {
  text-align: left;
  padding: 60px;
  min-width: 310px;
}
.shopbody-payment-product {
  background: #f7f7f7;
  border-radius: 2px;
  margin-top: 40px;
  margin-left: 40px;
  height: 80%;
  min-width: 180px;
}

.shopbody-payment-info {
  text-align: left;
  padding: 50px;
}

.shopbody-payment-price {
  font-size: 32px;
  font-weight: bold;
  word-break: break-all;
}

.shopbody-payment-currency {
  font-size: 16px;
  margin-left: 10px;
  font-weight: bold;
}

.shopbody-payment-productspec-item {
  margin-top: 30px;
}

.shopbody-payment-card-prefix {
  height: 24px;
  margin-top: 8px;
}
</style>


