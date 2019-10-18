<template>
    <li class="item">
        <span class="item-text">{{itemText}}</span><div :style="{backgroundColor: circleColor}" class="circle"></div>
    </li>
</template>

<script>
export default {
    name: "MainMenuItem",
    props: ['itemText', 'circleColor'],
    data: function () {
        return {
            count: 0
        }
  }
}
</script>

<style scoped>
.circle {
    border-radius: 100%;
    width: 50px;
    height: 50px;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.item-text{
    width: 100px;
    text-align: center
}
</style>