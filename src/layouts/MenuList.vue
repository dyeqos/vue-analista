<template>
  <q-item v-if="!children" clickable tag="a" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item
    v-else
    :content-inset-level="0.5"
    :caption="caption"
    :icon="icon"
    :label="title"
  >
    <q-item
      v-for="(child, key) in children"
      :key="key"
      tag="a"
      :href="child.link"
    >
      <q-item-section v-if="child.icon" avatar>
        <q-icon :name="child.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ child.title }}</q-item-label>
        <q-item-label caption>{{ child.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script setup lang="ts">
export interface MenuItemInterface {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  children?: MenuItemInterface[];
}
withDefaults(defineProps<MenuItemInterface>(), {
  caption: '',
  icon: '',
});
</script>
