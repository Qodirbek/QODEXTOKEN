from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__, static_url_path='/static')

# 📌 JSON bazasi
users_db = "users.json"

# 📌 Foydalanuvchilarni yuklash
def load_users():
    if not os.path.exists(users_db):
        return {}  # Agar fayl yo‘q bo‘lsa, bo‘sh dict qaytariladi
    try:
        with open(users_db, "r", encoding="utf-8") as f:
            return json.load(f) or {}  # JSON bo‘sh bo‘lsa, dict qaytariladi
    except json.JSONDecodeError:
        return {}

# 📌 Foydalanuvchilarni saqlash
def save_users(data):
    with open(users_db, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

# 📌 Asosiy sahifa
@app.route("/")
def index():
    return render_template("index.html")

# 📌 Earn sahifasi (Telegram ID qo‘shildi)
@app.route("/earn")
def earn():
    tg_id = request.args.get("tg_id", "123456")  # Agar ID bo‘lmasa, default 123456
    return render_template("earn.html", tg_id=tg_id)

# 📌 Upgrade sahifasi
@app.route("/upgrade")
def upgrade():
    return render_template("upgrade.html")

# 📌 Wallet sahifasi
@app.route("/wallet")
def wallet():
    return render_template("wallet.html")

# 📌 Foydalanuvchini ro‘yxatdan o‘tkazish
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    user_id = str(data.get("id"))
    username = data.get("username")
    wallet = data.get("wallet", "")

    if not user_id or not username:
        return jsonify({"error": "Foydalanuvchi ID va username talab qilinadi"}), 400

    users = load_users()

    # Agar foydalanuvchi bazada bo‘lmasa, yangi qo‘shiladi
    if user_id not in users:
        users[user_id] = {"username": username, "wallet": wallet, "coins": 0}
    else:
        # Agar foydalanuvchi bazada bo‘lsa, ma’lumotlar yangilanadi
        users[user_id]["username"] = username
        users[user_id]["wallet"] = wallet

    save_users(users)
    return jsonify({"message": "Foydalanuvchi ro‘yxatdan o‘tkazildi", "user": users[user_id]}), 200

# 📌 Foydalanuvchi ma'lumotlarini olish
@app.route("/api/get_user/<user_id>", methods=["GET"])
def get_user(user_id):
    users = load_users()
    user = users.get(user_id)

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "Foydalanuvchi topilmadi"}), 404

# 📌 Admin panel sahifasi
@app.route("/admin")
def admin():
    users = load_users()
    return render_template("admin.html", users=users)

# 📌 Flask serverni ishga tushirish
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)