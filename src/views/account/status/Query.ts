import { Component, Vue } from 'vue-property-decorator'
import QueryInput from './QueryInput.vue'
import QueryResult from './QueryResult.vue'

@Component({
    components : {
        QueryInput,
        QueryResult
    }
})
export default class Query extends Vue {

    currentStep = 0
    queryResult = {}

    nextStep(data: any) {
        this.queryResult = data
        if (this.currentStep < 1) {
            this.currentStep += 1
        }
    }

    finish() {
        this.currentStep = 0
    }

}
