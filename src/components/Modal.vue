<template>
    <div>
        <div class="modal fade show" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <button type="button" class="close" @click="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-if="save"  @click="saveModal">Save changes</button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
  export default {
    props:["save","title"],
    methods: {
      close() {
        this.$emit('close');
      },
      saveModal() {
          this.save && this.save();
      }
    },
  };
</script>
