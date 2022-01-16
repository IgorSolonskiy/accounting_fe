<template>
  <v-card
      height="100%"
      width="350"
      tile
  >
    <v-navigation-drawer width="350" color="#1A202E" dark permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">
            Accounting
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            link
        >
          <v-list-item-icon class="ma-6 ml-0">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h5 sidenav-item">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', link: 'dashboard'},
        {title: 'Entrepreneurs', icon: 'mdi-image', link: 'entrepreneurs'},
        {title: 'File manipulation', icon: 'mdi-help-box', link: 'manipulation'},
      ],
      right: null,
    }
  }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer__content {
  & > .v-list--dense .v-list-item .v-list-item__title {
    line-height: 2rem;
    font-weight: 400;
  }
}
</style>