<template>
<section class="content">
  <div class="row center-block">
    <div class="box box-solid box-primary">
      <div class="box-header">
          <h3 class="box-title"><b> General Configuration </b></h3>
          <div class="box-tools pull-right">
              <button class="btn btn-default btn-sm" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <!--  <button class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i></button> -->
          </div>
      </div>
      <div class="box-body">
        <div class="form-group col-md-4">
          <h5><b>instance </b></h5>
          <div :class="{ 'has-error': vErrors.has('instance') }">
            <select v-model="server.instance" class="form-control" :disabled="server.id !== '' ? true : false" >
              <option v-for="option in this.instances" v-bind:value="option.ip">
              {{option.name}}
              </option>
            </select>
            <span v-show="vErrors.has('instance')" class="help-block">{{ vErrors.first('instance') }}</span>
          </div>
        </div>
        <div class="form-group col-md-4">
          <h5><b> Host </b></h5>
          <div :class="{ 'has-error': vErrors.has('host') }" >
            <input name="host" v-model="server.host" v-validate="'required'" class="form-control" type="text" placeholder="Host" :disabled="server.id !== '' ? true : false">
            <span v-show="vErrors.has('host')" class="help-block">{{ vErrors.first('host') }}</span>
          </div>
        </div>
        <div class="form-group col-md-4">
          <h5><b>Port </b></h5>
          <div :class="{ 'has-error': vErrors.has('port') }">
            <input name="port" v-model="server.port" v-validate="'required|numeric'" class="form-control" type="text" placeholder="Port" :disabled="server.id !== '' ? true : false">
            <span v-show="vErrors.has('port')" class="help-block">{{ vErrors.first('port') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row center-block">

    <div class="box box-solid box-primary">
      <div class="box-header">
          <h3 class="box-title"><b> Server - Generic Items </b></h3>
          <div class="box-tools pull-right">
              <button class="btn btn-default btn-sm" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <!--  <button class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i></button> -->
          </div>
      </div>
      <div class="box-body">
          <GenericItem v-for="(generic, index) in this.server.arrayGenericServer"
            :generic="generic"
            contextType = "server"
            :key= "generic"
            v-on:removeGeneric="removeGeneric(index)" >
          </GenericItem>
          <button @click="addGeneric" type="button" class="btn btn-success">Add Generic Item</button>
      </div>
    </div>

        <LocationTag v-for="(location, index) in this.server.arrayLocations"
          :location="location"
          :key= "location"
          v-on:removeLocation="removeLocation(index)">
        </LocationTag>
        <button @click="addLocation" type="button" class="btn btn-success">AddLocation</button>


  </div>

</section>
</template>

<script>
import GenericItem from './GenericItem'
import LocationTag from './LocationTag'
import { EventBus } from '../../main.js'
import { find, propEq } from 'ramda'

export default {
  props: {
    server: {
      type: Object,
      required: true
    },
    instances: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  mounted: function () {
    // Listen on the bus for the parent component running validation
    EventBus.$on('validate', this.onValidate)
    // Watch for the changes to the childs error bag and pass back to the parent
    this.$watch(() => this.vErrors.errors, (newValue, oldValue) => {
      const newErrors = newValue.filter(error =>
        find(propEq('field', error.field))(oldValue) === undefined
      )
      const oldErrors = oldValue.filter(error =>
        find(propEq('field', error.field))(newValue) === undefined
      )
      EventBus.$emit('errors-changed', newErrors, oldErrors)
    })
  },
  methods: {
    onValidate: function () {
      this.$validator.validateAll().then(() => {
        console.log('ServerTag Validated')
      }).catch(() => {
        console.log('error ServerTag')
        EventBus.$emit('errors-changed', this.vErrors.errors)
      })
    },
    addGeneric: function () {
      this.server.arrayGenericServer.push({nameProp: '', valueProp: ''})
    },
    removeGeneric (index) {
      this.server.arrayGenericServer.splice(index, 1)
    },
    addLocation: function () {
      this.server.arrayLocations.push({
        pathGeneric: 'zero',
        path: '/',
        pathFileType: [],
        cacheServer: false,
        cacheClient: false,
        cacheClientTimeNumber: '',
        cacheClientTimeUnit: { code: 'm', description: 'minutes' },
        // para setar o radio button List
        StateProxyPass: 'zero',
        // para o guardar o valor caso seja 2 (ProxyPass)
        proxyPass: 'http://',
        // para setar a ddl
        upstreamId: '',
        // para conseguir escrever no ficheiro
        upstreamName: '',
        arrayGeneric: [] })
    },
    removeLocation (index) {
      this.server.arrayLocations.splice(index, 1)
      if (this.server.arrayLocations.length < 1) {
        this.addLocation()
      }
    }
  },
  created () {
    var app = this
    // para criar location por default
    if (app.server.id === '') {
      app.addLocation()
    }
  },
  components: {
    GenericItem: GenericItem,
    LocationTag: LocationTag
  }
}
</script>

<style>

</style>
