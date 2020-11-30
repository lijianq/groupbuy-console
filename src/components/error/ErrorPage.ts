import { Component, Prop, Vue } from 'vue-property-decorator'
import { RouterConfiguration} from '@/config'

@Component
export default class ErrorPage extends Vue {

     types = {
        401: {
            img: require('@/assets/401.svg'),
            title: '401',
            desc: 'error.401'
        },
        404: {
            img: require('@/assets/404.svg'),
            title: '404',
            desc: 'error.404'
        },
        500: {
            img: require('@/assets/500.svg'),
            title: '500',
            desc: 'error.500'
        }
    }

    @Prop({type: String, default: 'ErrorPage'})
    public name: string | undefined
    @Prop({type: String, default: '404'})
    public type: string | undefined

    goHome() {
        this.$router.push({path: RouterConfiguration.homePath})
    }
}
