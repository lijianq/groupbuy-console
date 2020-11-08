import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AccountLayout extends Vue {
    constructor() {
        super()
    }

    mounted() {
        document.body.classList.add('accountLayout')
    }

    beforeDestroy() {
        document.body.classList.remove('accountLayout')
    }

}
