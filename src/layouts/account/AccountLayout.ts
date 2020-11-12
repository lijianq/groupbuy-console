import {Component,Vue} from 'vue-property-decorator'
import { AppPreferenceModule } from '@/store'

@Component
export default class AccountLayout extends Vue {

    isMobile = true

    constructor() {
        super()
    }

    created() {
        this.isMobile = AppPreferenceModule.isMobile
    }

    mounted() {
        document.body.classList.add('accountLayout')
    }

    beforeDestroy() {
        document.body.classList.remove('accountLayout')
    }

}
