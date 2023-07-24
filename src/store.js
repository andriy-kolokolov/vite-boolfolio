import {reactive} from 'vue';

export const store = reactive({
    backEndURL: 'http://localhost:8000/',
    backEndStorageURL: 'http://localhost:8000/storage/',
})