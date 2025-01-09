var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.packet = (function() {

    /**
     * Namespace packet.
     * @exports packet
     * @namespace
     */
    var packet = {};

    packet.HeartBeatB2C = (function() {

        /**
         * Properties of a HeartBeatB2C.
         * @memberof packet
         * @interface IHeartBeatB2C
         */

        /**
         * Constructs a new HeartBeatB2C.
         * @memberof packet
         * @classdesc Represents a HeartBeatB2C.
         * @implements IHeartBeatB2C
         * @constructor
         * @param {packet.IHeartBeatB2C=} [properties] Properties to set
         */
        function HeartBeatB2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new HeartBeatB2C instance using the specified properties.
         * @function create
         * @memberof packet.HeartBeatB2C
         * @static
         * @param {packet.IHeartBeatB2C=} [properties] Properties to set
         * @returns {packet.HeartBeatB2C} HeartBeatB2C instance
         */
        HeartBeatB2C.create = function create(properties) {
            return new HeartBeatB2C(properties);
        };

        /**
         * Encodes the specified HeartBeatB2C message. Does not implicitly {@link packet.HeartBeatB2C.verify|verify} messages.
         * @function encode
         * @memberof packet.HeartBeatB2C
         * @static
         * @param {packet.IHeartBeatB2C} message HeartBeatB2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatB2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified HeartBeatB2C message, length delimited. Does not implicitly {@link packet.HeartBeatB2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof packet.HeartBeatB2C
         * @static
         * @param {packet.IHeartBeatB2C} message HeartBeatB2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatB2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartBeatB2C message from the specified reader or buffer.
         * @function decode
         * @memberof packet.HeartBeatB2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {packet.HeartBeatB2C} HeartBeatB2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatB2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.packet.HeartBeatB2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartBeatB2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof packet.HeartBeatB2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {packet.HeartBeatB2C} HeartBeatB2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatB2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartBeatB2C message.
         * @function verify
         * @memberof packet.HeartBeatB2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartBeatB2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return HeartBeatB2C;
    })();

    packet.HeartBeatC2B = (function() {

        /**
         * Properties of a HeartBeatC2B.
         * @memberof packet
         * @interface IHeartBeatC2B
         */

        /**
         * Constructs a new HeartBeatC2B.
         * @memberof packet
         * @classdesc Represents a HeartBeatC2B.
         * @implements IHeartBeatC2B
         * @constructor
         * @param {packet.IHeartBeatC2B=} [properties] Properties to set
         */
        function HeartBeatC2B(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new HeartBeatC2B instance using the specified properties.
         * @function create
         * @memberof packet.HeartBeatC2B
         * @static
         * @param {packet.IHeartBeatC2B=} [properties] Properties to set
         * @returns {packet.HeartBeatC2B} HeartBeatC2B instance
         */
        HeartBeatC2B.create = function create(properties) {
            return new HeartBeatC2B(properties);
        };

        /**
         * Encodes the specified HeartBeatC2B message. Does not implicitly {@link packet.HeartBeatC2B.verify|verify} messages.
         * @function encode
         * @memberof packet.HeartBeatC2B
         * @static
         * @param {packet.IHeartBeatC2B} message HeartBeatC2B message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatC2B.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified HeartBeatC2B message, length delimited. Does not implicitly {@link packet.HeartBeatC2B.verify|verify} messages.
         * @function encodeDelimited
         * @memberof packet.HeartBeatC2B
         * @static
         * @param {packet.IHeartBeatC2B} message HeartBeatC2B message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatC2B.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartBeatC2B message from the specified reader or buffer.
         * @function decode
         * @memberof packet.HeartBeatC2B
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {packet.HeartBeatC2B} HeartBeatC2B
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatC2B.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.packet.HeartBeatC2B();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartBeatC2B message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof packet.HeartBeatC2B
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {packet.HeartBeatC2B} HeartBeatC2B
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatC2B.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartBeatC2B message.
         * @function verify
         * @memberof packet.HeartBeatC2B
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartBeatC2B.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return HeartBeatC2B;
    })();

    packet.Packet = (function() {

        /**
         * Properties of a Packet.
         * @memberof packet
         * @interface IPacket
         * @property {packet.MsgNo|null} [msg_no] Packet msg_no
         * @property {Uint8Array|null} [data] Packet data
         * @property {number|Long|null} [unix_milli] Packet unix_milli
         */

        /**
         * Constructs a new Packet.
         * @memberof packet
         * @classdesc Represents a Packet.
         * @implements IPacket
         * @constructor
         * @param {packet.IPacket=} [properties] Properties to set
         */
        function Packet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Packet msg_no.
         * @member {packet.MsgNo} msg_no
         * @memberof packet.Packet
         * @instance
         */
        Packet.prototype.msg_no = 0;

        /**
         * Packet data.
         * @member {Uint8Array} data
         * @memberof packet.Packet
         * @instance
         */
        Packet.prototype.data = $util.newBuffer([]);

        /**
         * Packet unix_milli.
         * @member {number|Long} unix_milli
         * @memberof packet.Packet
         * @instance
         */
        Packet.prototype.unix_milli = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Packet instance using the specified properties.
         * @function create
         * @memberof packet.Packet
         * @static
         * @param {packet.IPacket=} [properties] Properties to set
         * @returns {packet.Packet} Packet instance
         */
        Packet.create = function create(properties) {
            return new Packet(properties);
        };

        /**
         * Encodes the specified Packet message. Does not implicitly {@link packet.Packet.verify|verify} messages.
         * @function encode
         * @memberof packet.Packet
         * @static
         * @param {packet.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg_no != null && message.hasOwnProperty("msg_no"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.msg_no);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.unix_milli != null && message.hasOwnProperty("unix_milli"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.unix_milli);
            return writer;
        };

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link packet.Packet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof packet.Packet
         * @static
         * @param {packet.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @function decode
         * @memberof packet.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {packet.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.packet.Packet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msg_no = reader.int32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.unix_milli = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof packet.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {packet.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Packet message.
         * @function verify
         * @memberof packet.Packet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Packet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg_no != null && message.hasOwnProperty("msg_no"))
                switch (message.msg_no) {
                default:
                    return "msg_no: enum value expected";
                case 0:
                case 26:
                case 27:
                    break;
                }
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.unix_milli != null && message.hasOwnProperty("unix_milli"))
                if (!$util.isInteger(message.unix_milli) && !(message.unix_milli && $util.isInteger(message.unix_milli.low) && $util.isInteger(message.unix_milli.high)))
                    return "unix_milli: integer|Long expected";
            return null;
        };

        return Packet;
    })();

    /**
     * MsgNo enum.
     * @name packet.MsgNo
     * @enum {string}
     * @property {number} Def=0 Def value
     * @property {number} MsgNo_HeartBeatB2C=26 MsgNo_HeartBeatB2C value
     * @property {number} MsgNo_HeartBeatC2B=27 MsgNo_HeartBeatC2B value
     */
    packet.MsgNo = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Def"] = 0;
        values[valuesById[26] = "MsgNo_HeartBeatB2C"] = 26;
        values[valuesById[27] = "MsgNo_HeartBeatC2B"] = 27;
        return values;
    })();

    return packet;
})();