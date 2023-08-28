import axios from 'axios';
import moment from 'moment'; 

const config = {
    "name": "checkgithub",
    "aliases": ["infogithub","gh","ifgh"],
    "description": "Kiểm tra thông tin github",
    "usage": "<tên người dùng>",
    "cooldown": 5,
    "permissions": [ 0, 1, 2 ],
    "credits": "WaifuCat",
    "extra": {}
}

async function onCall({ message, args }) {
    const name = args.join(" ").toLowerCase();

    try {
        const response = await axios.get(`https://api.github.com/users/${name}`);
        const { login,id,bio,public_repos,followers,following,location,updated_at,created_at,avatar_url } = response.data;
        const infogithub =
            `Tên: ${login}\n` +
            `ID: ${id}\n` +
            `Tiểu sử: ${bio || "không có thông tin!"}\n` +
            `Các bản công cộng: ${public_repos || "không có thông tin!"}\n` +
            `Người theo dõi: ${followers}\n` +
            `Đang theo dõi: ${following}\n` +
            `Vị trí: ${location || "không có thông tin!"}\n` +
            `Lần cập nhật gần nhất: ${moment.utc(updated_at).format("dddd, MMMM, Do YYYY")}\n` +
            `Thời gian tạo tài khoản: ${moment.utc(created_at).format("dddd, MMMM, Do YYYY")}\n` +
            `Dưới đây là avatar !`;
        const link = avatar_url;
        const imageStream = await global.getStream(link);

        await message.send({
            body: infogithub,
            attachment: [imageStream]
        });

    } catch (error) {
        message.send(`Có lỗi đã xảy ra hoặc không tìm thấy thông tin !`);
    }
}

export default {
    config,
    onCall
};
