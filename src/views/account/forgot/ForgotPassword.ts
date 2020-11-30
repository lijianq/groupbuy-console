import { Component, Vue } from 'vue-property-decorator'
import AuthCode from './AuthCode.vue'
import ResetPassword from './ResetPassword.vue'
import ResetFinish from './ResetFinish.vue'

@Component({
    components: {
        AuthCode,
        ResetPassword,
        ResetFinish
    }
})
export default class ForgotPassword extends Vue {
    currentStep = 0
    nextStep() {
        if (this.currentStep < 2) {
            this.currentStep += 1
        }
    }
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep -= 1
        }
    }
    finish() {
        this.currentStep = 0
    }
}
