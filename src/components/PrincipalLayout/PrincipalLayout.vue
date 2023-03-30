
<template>
    <div>
        <TopBar />
    </div>
    <ContentsLayout />
</template>
<script>

import TopBar from '../TopBar.vue'
import ContentsLayout from './ContentsLayout.vue'

export default {
    components: {
        TopBar,
        ContentsLayout,
    },

    data() {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
        }
    },
}
</script>
  
