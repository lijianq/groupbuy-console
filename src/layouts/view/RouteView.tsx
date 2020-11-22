import { Component, Vue, Prop } from 'vue-property-decorator'
import { AppPreferenceModule } from '@/store'

@Component
export default class RouteView extends Vue {

    @Prop({type: Boolean, default: true})
    public keepAlive: boolean | undefined

    render() {
        const metaKeepAlive = this.$route.meta.keepAlive
        const multiTab = AppPreferenceModule.getMultiTab()
        const inKeep = (
            <keep-alive>
                <router-view/>
            </keep-alive>
        )
        const notKeep = (
            <router-view/>
        )
        if (!multiTab && !metaKeepAlive) {
            return notKeep
        }
        return this.keepAlive || multiTab || metaKeepAlive ? inKeep: notKeep
    }

}
