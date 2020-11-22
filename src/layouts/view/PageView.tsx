import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageView extends Vue {
    render() {
        return (
            <page-header-wrapper>
                <router-view />
            </page-header-wrapper>
        )
    }
}
