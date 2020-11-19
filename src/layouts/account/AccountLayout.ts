import {Component,Vue} from 'vue-property-decorator'
import AppRuntimeModule from '@/store/modules/AppRuntime'

@Component
export default class AccountLayout extends Vue {

    isMobile = true

    constructor() {
        super()
    }

    created() {
        this.isMobile = AppRuntimeModule.isMobile
    }

    mounted() {
        document.body.classList.add('accountLayout')
    }

    beforeDestroy() {
        document.body.classList.remove('accountLayout')
    }

}
