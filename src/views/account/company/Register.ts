import { Component, Vue } from 'vue-property-decorator'
import RegisterBaseInfo from './RegisterBaseInfo.vue'
import RegisterLicense from './RegisterLicense.vue'
import RegisterFinish from './RegisterFinish.vue'

@Component({
    components: {
        RegisterBaseInfo,
        RegisterLicense,
        RegisterFinish
    }
})
export default class Register extends Vue {
    currentStep = 0
    baseFormData: any = null

    nextStep(data: any) {
        this.baseFormData = data
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
