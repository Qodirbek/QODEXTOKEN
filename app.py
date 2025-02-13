from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__, static_url_path='/static')

# 📌 JSON bazasi
users_db = "users.json"

# 📌 Foydalanuvchilarni yuklash
def load_users():
    if not os.path.exists(users_db):
        return {}
    try:
        with open(users_db, "r", encoding="utf-8") as f:
            return json.load(f) or {}
    except json.JSONDecodeError:
        return {}

# 📌 Foydalanuvchilarni saqlash
def save_users(data):
    with open(users_db, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

# 📌 Asosiy sahifa (foydalanuvchi ID bilan kirishi kerak)
@app.route("/")
def index():
    user_id = request.args.get("user_id")  # Telegram botdan ID olish
    if not user_id:
        return "<h3>Iltimos, Telegram bot orqali kiring.</h3>"
    return render_template("index.html")

# 📌 Earn sahifasi
@app.route("/earn")
def earn():
    user_id = request.args.get("user_id")
    return render_template("earn.html", user_id=user_id)

# 📌 Upgrade sahifasi
@app.route("/upgrade")
def upgrade():
    user_id = request.args.get("user_id")
    return render_template("upgrade.html", user_id=user_id)

# 📌 Wallet sahifasi
@app.route("/wallet")
def wallet():
    user_id = request.args.get("user_id")
    return render_template("wallet.html", user_id=user_id)

# 📌 Foydalanuvchini bot orqali ro‘yxatdan o‘tkazish
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    user_id = str(data.get("id"))
    username = data.get("username", "NoName")
    first_name = data.get("first_name", "User")

    if not user_id:
        return jsonify({"error": "Foydalanuvchi ID talab qilinadi"}), 400

    users = load_users()

    # Agar foydalanuvchi bazada bo‘lmasa, qo‘shamiz
    if user_id not in users:
        users[user_id] = {
            "username": username,
            "first_name": first_name,
            "coins": 0,
            "energy": 1000
        }

    save_users(users)
    return jsonify({"message": "Foydalanuvchi ro‘yxatdan o‘tkazildi", "user": users[user_id]}), 200

# 📌 Foydalanuvchining ma’lumotlarini olish
@app.route("/api/get_user/<user_id>", methods=["GET"])
def get_user(user_id):
    users = load_users()
    user = users.get(user_id)

    if not user:
        return jsonify({"error": "Foydalanuvchi topilmadi"}), 404

    return jsonify(user)

# 📌 Tuxum bosganda tanga qo‘shish
@app.route("/api/click_egg/<user_id>", methods=["GET"])
def click_egg(user_id):
    users = load_users()

    if user_id not in users:
        return jsonify({"error": "Foydalanuvchi topilmadi"}), 404

    user = users[user_id]

    # Agar energiya 0 bo‘lsa, tanga ishlab bo‘lmaydi
    if user["energy"] <= 0:
        return jsonify({"error": "Energiyangiz tugagan!"}), 400

    # 1 ta tanga qo‘shiladi, 1 ta energiya kamayadi
    user["coins"] += 1
    user["energy"] -= 1

    save_users(users)
    return jsonify({"success": True, "coins": user["coins"], "energy": user["energy"]})

# 📌 Admin sahifasi (foydalanuvchilar ro‘yxati)
@app.route("/admin")
def admin():
    users = load_users()
    return render_template("admin.html", users=users)
    
    # 📌 Admin uchun foydalanuvchilar ro'yxatini JSON shaklida qaytarish
@app.route("/api/users")
def get_users():
    users = load_users()
    return jsonify(users)

# 📌 Flask serverni ishga tushirish
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)