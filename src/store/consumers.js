import Vue from "vue";

export const state = () => ({
  consumers: []
});

export const mutations = {
  setRoomState(state, payload) {
    if (payload.state === "closed") {
      state.consumers = [];
    }
  },

  addConsumer(state, payload) {
    state.consumers.push(payload.consumer);
  },

  removeConsumer(state, payload) {
    const consumerId = payload.consumerId;

    state.consumers = state.consumers.filter(
      consumer => consumer.id !== consumerId
    );
  },

  setConsumerPaused(state, payload) {
    const { consumerId, originator } = payload;
    const consumer = state.consumers.find(
      consumer => consumer.id === consumerId
    );

    if (originator === "local") {
      Vue.set(consumer, "locallyPaused", true);
    } else {
      Vue.set(consumer, "remotelyPaused", true);
    }
  },

  setConsumerResumed(state, payload) {
    const { consumerId, originator } = payload;
    const consumer = state.consumers.find(
      consumer => consumer.id === consumerId
    );

    if (originator === "local") {
      Vue.set(consumer, "locallyPaused", false);
    } else {
      Vue.set(consumer, "remotelyPaused", false);
    }
  },

  setConsumerCurrentLayers(state, payload) {
    const { consumerId, spatialLayer, temporalLayer } = payload;
    const consumer = state.consumers.find(
      consumer => consumer.id === consumerId
    );

    Vue.set(consumer, "currentSpatialLayer", spatialLayer);
    Vue.set(consumer, "currentTemporalLayer", temporalLayer);
  },

  setConsumerPreferredLayers(state, payload) {
    const { consumerId, spatialLayer, temporalLayer } = payload;
    const consumer = state.consumers.find(
      consumer => consumer.id === consumerId
    );

    Vue.set(consumer, "preferredSpatialLayer", spatialLayer);
    Vue.set(consumer, "preferredTemporalLayer", temporalLayer);
  },

  setConsumerPriority(state, payload) {
    const { consumerId, priority } = payload;
    const consumer = state.consumers.find(
      consumer => consumer.id === consumerId
    );

    Vue.set(consumer, "priority", priority);
  },

  setConsumerTrack(state, payload) {
    const { consumerId, track } = payload;
    const consumer = state.consumers.find(
      consumer => consumer.id === consumerId
    );

    Vue.set(consumer, "track", track);
  },

  setConsumerScore(state, payload) {
    const { consumerId, score } = payload;
    const consumer = state.consumers.find(
      consumer => consumer.id === consumerId
    );

    if (consumer) {
      Vue.set(consumer, "score", score);
    }
  }
};

const module = {
  namespaced: true,
  state,
  mutations
};

export default module;
