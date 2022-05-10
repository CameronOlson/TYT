<template>
  <div>
    <button data-bs-toggle="modal" data-bs-target="#create-story">
      Tell A Story
    </button>
  </div>
  <Modal id="create-story">
    <template #modal-title>
      <h6>Tell Your Tale</h6>
    </template>
    <template #modal-body>
      <StoryForm />
    </template>
  </Modal>
</template>

<script>

</script>

<style scoped lang="scss">
</style>
