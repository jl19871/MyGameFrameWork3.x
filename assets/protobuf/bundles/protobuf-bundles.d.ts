type Long = protobuf.Long;

/** Namespace packet. */
declare namespace packet {

    /** Properties of a HeartBeatB2C. */
    interface IHeartBeatB2C {
    }

    /** Represents a HeartBeatB2C. */
    class HeartBeatB2C implements IHeartBeatB2C {

        /**
         * Constructs a new HeartBeatB2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: packet.IHeartBeatB2C);

        /**
         * Creates a new HeartBeatB2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatB2C instance
         */
        public static create(properties?: packet.IHeartBeatB2C): packet.HeartBeatB2C;

        /**
         * Encodes the specified HeartBeatB2C message. Does not implicitly {@link packet.HeartBeatB2C.verify|verify} messages.
         * @param message HeartBeatB2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: packet.IHeartBeatB2C, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified HeartBeatB2C message, length delimited. Does not implicitly {@link packet.HeartBeatB2C.verify|verify} messages.
         * @param message HeartBeatB2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: packet.IHeartBeatB2C, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a HeartBeatB2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatB2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): packet.HeartBeatB2C;

        /**
         * Decodes a HeartBeatB2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatB2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): packet.HeartBeatB2C;

        /**
         * Verifies a HeartBeatB2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a HeartBeatC2B. */
    interface IHeartBeatC2B {
    }

    /** Represents a HeartBeatC2B. */
    class HeartBeatC2B implements IHeartBeatC2B {

        /**
         * Constructs a new HeartBeatC2B.
         * @param [properties] Properties to set
         */
        constructor(properties?: packet.IHeartBeatC2B);

        /**
         * Creates a new HeartBeatC2B instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatC2B instance
         */
        public static create(properties?: packet.IHeartBeatC2B): packet.HeartBeatC2B;

        /**
         * Encodes the specified HeartBeatC2B message. Does not implicitly {@link packet.HeartBeatC2B.verify|verify} messages.
         * @param message HeartBeatC2B message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: packet.IHeartBeatC2B, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified HeartBeatC2B message, length delimited. Does not implicitly {@link packet.HeartBeatC2B.verify|verify} messages.
         * @param message HeartBeatC2B message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: packet.IHeartBeatC2B, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a HeartBeatC2B message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatC2B
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): packet.HeartBeatC2B;

        /**
         * Decodes a HeartBeatC2B message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatC2B
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): packet.HeartBeatC2B;

        /**
         * Verifies a HeartBeatC2B message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Packet. */
    interface IPacket {

        /** Packet msg_no */
        msg_no?: (packet.MsgNo|null);

        /** Packet data */
        data?: (Uint8Array|null);

        /** Packet unix_milli */
        unix_milli?: (number|Long|null);
    }

    /** Represents a Packet. */
    class Packet implements IPacket {

        /**
         * Constructs a new Packet.
         * @param [properties] Properties to set
         */
        constructor(properties?: packet.IPacket);

        /** Packet msg_no. */
        public msg_no: packet.MsgNo;

        /** Packet data. */
        public data: Uint8Array;

        /** Packet unix_milli. */
        public unix_milli: (number|Long);

        /**
         * Creates a new Packet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Packet instance
         */
        public static create(properties?: packet.IPacket): packet.Packet;

        /**
         * Encodes the specified Packet message. Does not implicitly {@link packet.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: packet.IPacket, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link packet.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: packet.IPacket, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): packet.Packet;

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): packet.Packet;

        /**
         * Verifies a Packet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** MsgNo enum. */
    enum MsgNo {
        Def = 0,
        MsgNo_HeartBeatB2C = 26,
        MsgNo_HeartBeatC2B = 27
    }
}
