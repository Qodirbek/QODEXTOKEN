from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__, static_url_path='/static')

# Foydalanuvchilar ma'lumotlarini saqlash uchun JSON fayli
users_db = "users.json"

# Foydalanuvchi ma'lumotlarini yuklash
def load_users():
    if not os.path.exists(users_db):
        return {}
    try:
        with open(users_db, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return {}

# Foydalanuvchi ma'lumotlarini saqlash
def save_users(data):
    with open(users_db, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

# Asosiy sahifa
@app.route("/")
def index():
    return render_template("index.html")

# Earn sahifasi (Telegram ID qo‘shildi)
@app.route("/earn")
def earn():
    tg_id = request.args.get("tg_id", "123456")  # Agar ID bo‘lmasa, default qiymat 123456
    return render_template("earn.html", tg_id=tg_id)

# Upgrade sahifasi
@app.route("/upgrade")
def upgrade():
    return render_template("upgrade.html")

# Wallet sahifasi
@app.route("/wallet")
def wallet():
    return render_template("wallet.html")

# Telegram orqali foydalanuvchini ro‘yxatdan o‘tkazish
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    user_id = str(data.get("id"))
    username = data.get("username")
    wallet = data.get("wallet", "")

    if not user_id or not username:
        return jsonify({"error": "Foydalanuvchi ID va username talab qilinadi"}), 400

    users = load_users()
    users[user_id] = {"username": username, "wallet": wallet}
    save_users(users)

    return jsonify({"message": "Foydalanuvchi ro‘yxatdan o‘tkazildi", "user": users[user_id]}), 200

# Admin panel sahifasi
@app.route("/admin")
def admin():
    users = load_users()
    return render_template("admin.html", users=users)

if __name__ == "__main__":
    app.run(debug=True)