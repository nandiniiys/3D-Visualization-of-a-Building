import {MetaModel} from "./MetaModel.js";
import {MetaObject} from "./MetaObject.js";
import {math} from "../scene/math/math.js";

/**
 * @desc Metadata corresponding to a {@link Scene}.
 *
 * * Located in {@link Viewer#metaScene}.
 * * Contains {@link MetaModel}s and {@link MetaObject}s.
 * * [Scene Graphs user guide](https://github.com/xeokit/xeokit-sdk/wiki/Scene-Graphs)
 * * [Scene graph example with metadata](http://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_SceneGraph_metadata)
 */
class MetaScene {

    /**
     * @private
     */
    constructor(viewer, scene) {

        /**
         * The {@link Viewer}.
         * @property viewer
         * @type {Viewer}
         */
        this.viewer = viewer;

        /**
         * The {@link Scene}.
         * @property scene
         * @type {Scene}
         */
        this.scene = scene;

        /**
         * The {@link MetaModel}s belonging to this MetaScene, each mapped to its {@link MetaModel#modelId}.
         *
         * @type {{String:MetaModel}}
         */
        this.metaModels = {};

        /**
         * The {@link MetaObject}s belonging to this MetaScene, each mapped to its {@link MetaObject#id}.
         *
         * @type {{String:MetaObject}}
         */
        this.metaObjects = {};

        /**
         * The {@link MetaObject}s belonging to this MetaScene, each mapped to its {@link MetaObject#type}.
         *
         * @type {{String:MetaObject}}
         */
        this.metaObjectsByType = {};

        /**
         * Tracks number of MetaObjects of each type.
         * @private
         */
        this._typeCounts = {};

        /**
         * Subscriptions to events sent with {@link fire}.
         * @private
         */
        this._eventSubs = {};
    }

    /**
     * Subscribes to an event fired at this Viewer.
     *
     * @param {String} event The event
     * @param {Function} callback Callback fired on the event
     */
    on(event, callback) {
        let subs = this._eventSubs[event];
        if (!subs) {
            subs = [];
            this._eventSubs[event] = subs;
        }
        subs.push(callback);
    }

    /**
     * Fires an event at this Viewer.
     *
     * @param {String} event Event name
     * @param {Object} value Event parameters
     */
    fire(event, value) {
        const subs = this._eventSubs[event];
        if (subs) {
            for (let i = 0, len = subs.length; i < len; i++) {
                subs[i](value);
            }
        }
    }

    /**
     * Unsubscribes from an event fired at this Viewer.
     * @param event
     */
    off(event) { // TODO

    }

    /**
     * Creates a {@link MetaModel} in this MetaScene.
     *
     * @param {String} modelId ID for the new {@link MetaModel}, which will have {@link MetaModel#id} set to this value.
     * @param {Object} metaModelData Data for the {@link MetaModel} - (see [Model Metadata](https://github.com/xeolabs/xeokit.io/wiki/Model-Metadata)).
     * @param {Object} [options] Options for creating the {@link MetaModel}.
     * @param {Object} [options.includeTypes] When provided, only create {@link MetaObject}s with types in this list.
     * @param {Object} [options.excludeTypes] When provided, never create {@link MetaObject}s with types in this list.
     * @param {Boolean} [options.globalizeObjectIds=false] Whether to globalize each {@link MetaObject#id}. Set
     * this ````true```` when you need to load multiple instances of the same meta model, to avoid ID clashes between
     * the meta objects in the different instances.
     * @returns {MetaModel} The new MetaModel.
     */
    createMetaModel(modelId, metaModelData, options = {}) {

        // TODO: validate metadata
        // TODO: replace MetaModel if ID already used

        const projectId = metaModelData.projectId || "none";
        const revisionId = metaModelData.revisionId || "none";
        const newObjects = metaModelData.metaObjects;
        const author = metaModelData.author;
        const createdAt = metaModelData.createdAt;
        const creatingApplication = metaModelData.creatingApplication;
        const schema = metaModelData.schema;

        var includeTypes;
        // if (options.includeTypes) {
        //     includeTypes = {};
        //     for (let i = 0, len = options.includeTypes.length; i < len; i++) {
        //         includeTypes[options.includeTypes[i]] = true;
        //     }
        // }
        //
        var excludeTypes;
        // if (options.excludeTypes) {
        //     excludeTypes = {};
        //     for (let i = 0, len = options.excludeTypes.length; i < len; i++) {
        //         includeTypes[options.excludeTypes[i]] = true;
        //     }
        // }

        const metaModel = new MetaModel(this, modelId, projectId, revisionId, author, createdAt, creatingApplication, schema, null);

        this.metaModels[modelId] = metaModel;

        for (let i = 0, len = newObjects.length; i < len; i++) {
            const newObject = newObjects[i];
            const type = newObject.type;
            if (excludeTypes && excludeTypes[type]) {
                continue;
            }
            if (includeTypes && !includeTypes[type]) {
                continue;
            }
            const objectId = options.globalizeObjectIds ? math.globalizeObjectId(modelId, newObject.id) : newObject.id;
            const originalSystemId = newObject.id;
            const name = newObject.name;
            const properties = newObject.properties;
            const parent = null;
            const children = null;
            const external = newObject.external;
            const metaObject = new MetaObject(metaModel, objectId, originalSystemId, name, type, properties, parent, children, external);
            this.metaObjects[objectId] = metaObject;
            (this.metaObjectsByType[type] || (this.metaObjectsByType[type] = {}))[objectId] = metaObject;
            if (this._typeCounts[type] === undefined) {
                this._typeCounts[type] = 1;
            } else {
                this._typeCounts[type]++;
            }
        }

        for (let i = 0, len = newObjects.length; i < len; i++) {
            const newObject = newObjects[i];
            const objectId = options.globalizeObjectIds ? math.globalizeObjectId(modelId, newObject.id) : newObject.id;
            const metaObject = this.metaObjects[objectId];
            if (!metaObject) {
                continue;
            }
            if (newObject.parent === undefined || newObject.parent === null) {
                metaModel.rootMetaObject = metaObject;
            } else if (newObject.parent) {
                const parentId = options.globalizeObjectIds ? math.globalizeObjectId(modelId, newObject.parent) : newObject.parent;
                let parentMetaObject = this.metaObjects[parentId];
                if (parentMetaObject) {
                    metaObject.parent = parentMetaObject;
                    parentMetaObject.children = parentMetaObject.children || [];
                    parentMetaObject.children.push(metaObject);
                }
            }
        }

        this.fire("metaModelCreated", modelId);
        return metaModel;
    }

    /**
     * Removes a {@link MetaModel} from this MetaScene.
     *
     * Fires a "metaModelDestroyed" event with the value of the {@link MetaModel#id}.
     *
     * @param {String} id ID of the target {@link MetaModel}.
     */
    destroyMetaModel(id) {
        const metaModel = this.metaModels[id];
        if (!metaModel) {
            return;
        }
        const metaObjects = this.metaObjects;
        const metaObjectsByType = this.metaObjectsByType;

        let visit = (metaObject) => {
            delete metaObjects[metaObject.id];
            const types = metaObjectsByType[metaObject.type];
            if (types && types[metaObject.id]) {
                delete types[metaObject.id];
                if (--this._typeCounts[metaObject.type] === 0) {
                    delete this._typeCounts[metaObject.type];
                    delete metaObjectsByType[metaObject.type];
                }
            }
            const children = metaObject.children;
            if (children) {
                for (let i = 0, len = children.length; i < len; i++) {
                    const childMetaObject = children[i];
                    visit(childMetaObject);
                }
            }
        };

        visit(metaModel.rootMetaObject);
        delete this.metaModels[id];
        this.fire("metaModelDestroyed", id);
    }

    /**
     * Gets the {@link MetaObject#id}s of the {@link MetaObject}s that have the given {@link MetaObject#type}.
     *
     * @param {String} type The type.
     * @returns {String[]} Array of {@link MetaObject#id}s.
     */
    getObjectIDsByType(type) {
        const metaObjects = this.metaObjectsByType[type];
        return metaObjects ? Object.keys(metaObjects) : [];
    }

    /**
     * Gets the {@link MetaObject#id}s of the {@link MetaObject}s within the given subtree.
     *
     * @param {String} id  ID of the root {@link MetaObject} of the given subtree.
     * @param {String[]} [includeTypes] Optional list of types to include.
     * @param {String[]} [excludeTypes] Optional list of types to exclude.
     * @returns {String[]} Array of {@link MetaObject#id}s.
     */
    getObjectIDsInSubtree(id, includeTypes, excludeTypes) {
        const list = [];
        const metaObject = this.metaObjects[id];
        const includeMask = (includeTypes && includeTypes.length > 0) ? arrayToMap(includeTypes) : null;
        const excludeMask = (excludeTypes && excludeTypes.length > 0) ? arrayToMap(excludeTypes) : null;

        function visit(metaObject) {
            if (!metaObject) {
                return;
            }
            var include = true;
            if (excludeMask && excludeMask[metaObject.type]) {
                include = false;
            } else if (includeMask && (!includeMask[metaObject.type])) {
                include = false;
            }
            if (include) {
                list.push(metaObject.id);
            }
            const children = metaObject.children;
            if (children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    visit(children[i]);
                }
            }
        }

        visit(metaObject);
        return list;
    }

    /**
     * Iterates over the {@link MetaObject}s within the subtree.
     *
     * @param {String} id ID of root {@link MetaObject}.
     * @param {Function} callback Callback fired at each {@link MetaObject}.
     */
    withMetaObjectsInSubtree(id, callback) {
        const metaObject = this.metaObjects[id];
        if (!metaObject) {
            return;
        }
        metaObject.withMetaObjectsInSubtree(callback);
    }
}

function arrayToMap(array) {
    const map = {};
    for (var i = 0, len = array.length; i < len; i++) {
        map[array[i]] = true;
    }
    return map;
}

export {MetaScene};