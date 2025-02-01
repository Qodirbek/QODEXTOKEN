from flask import Flask, render_template, redirect, url_for, request, session, jsonify

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Session uchun maxfiy kalit

@app.route('/')
def home():
    user_data = session.get('user_data', None)
    if user_data:
        return render_template("index.html", 
                               coins=user_data["coins"], 
                               username=user_data["username"], 
                               profile_pic=user_data["profile_pic"], 
                               page="home")
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Telegram orqali kirgan foydalanuvchilarni ro‘yxatdan o‘tkazish"""
    if request.method == 'POST':
        # Login uchun foydalanuvchi ma'lumotlarini olish
        username = request.form.get('username')
        profile_pic = request.form.get('profile_pic')

        if not username or not profile_pic:
            return jsonify({"error": "Invalid data"}), 400  # Xato bo‘lsa, qaytarish

        session['user_data'] = {
            'username': username,
            'profile_pic': profile_pic,
            'coins': 0  # Boshlang‘ich tangalar soni
        }
        return redirect(url_for('home'))  # Login muvaffaqiyatli bo'lsa home sahifasiga yo‘naltirish
    
    # GET request bo'lsa login sahifasini qaytarish
    return render_template("login.html")

@app.route('/click_coin', methods=['POST'])
def click_coin():
    """Foydalanuvchi tangaga bosganida tanga sonini oshirish"""
    user_data = session.get('user_data', None)
    if user_data:
        user_data["coins"] += 1
        session.modified = True  # Sessiyani yangilash
        return jsonify({"coins": user_data["coins"]})  # AJAX uchun JSON qaytarish
    return jsonify({"error": "User not logged in"}), 403

@app.route('/earn')
def earn():
    """Earn sahifasi"""
    user_data = session.get('user_data', None)
    if user_data:
        return render_template("index.html", 
                               coins=user_data["coins"], 
                               username=user_data["username"], 
                               profile_pic=user_data["profile_pic"], 
                               page="earn")
    return redirect(url_for('home'))

@app.route('/upgrade')
def upgrade():
    """Upgrade sahifasi"""
    user_data = session.get('user_data', None)
    if user_data:
        return render_template("index.html", 
                               coins=user_data["coins"], 
                               username=user_data["username"], 
                               profile_pic=user_data["profile_pic"], 
                               page="upgrade")
    return redirect(url_for('home'))

@app.route('/wallet')
def wallet():
    """Wallet sahifasi"""
    user_data = session.get('user_data', None)
    if user_data:
        return render_template("index.html", 
                               coins=user_data["coins"], 
                               username=user_data["username"], 
                               profile_pic=user_data["profile_pic"], 
                               page="wallet")
    return redirect(url_for('home'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)