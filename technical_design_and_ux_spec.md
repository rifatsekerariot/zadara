# Teknik Tasarım ve UI/UX Dokümanı: Yerli ve Milli Sanallaştırma Platformu

Bu doküman, Zadara (zCompute/zStorage) altyapısını kullanan ancak son kullanıcıya kendini geleneksel, güvenilir ve yerli bir "Enterprise" sanallaştırma platformu olarak sunan PWA projesinin teknik ve tasarım detaylarını içerir.

## 1. Terminoloji Dönüşüm Sözlüğü (Mapping)

IT yöneticilerinin alışkanlıklarını bozmamak adına Zadara'ya özgü terimler tamamen soyutlanarak, sektör standardı (VMware/Enterprise) terminolojiye dönüştürülecektir.

| Zadara Terimi (API) | Kullanıcı Arayüzü (UI) | Açıklama |
| :--- | :--- | :--- |
| **VPSA / Storage Pool** | **Datastore** / **Storage Cluster** | Depolama birimleri, alışılagelmiş "Datastore" mantığıyla sunulacak. |
| **Engine** | **ESXi Host** / **Compute Node** | Hesaplama üniteleri, fiziksel sunucu (Host) gibi gösterilecek. |
| **Image** | **Template** / **OVF** | İmajlar, şablon veya hazır paket olarak adlandırılacak. |
| **Volume** | **Virtual Disk (vmdk)** | Disk bölümleri sanal disk dosyası gibi hissettirilecek. |
| **Interface** | **vNIC** / **Port Group** | Ağ arayüzleri sanal ağ kartları olarak sunulacak. |
| **VPC / Network** | **vSwitch** / **Distributed Switch** | VPC yapıları sanal switch mantığıyla görselleştirilecek. |
| **Security Group** | **Firewall Rules** | Güvenlik grupları basit güvenlik duvarı kuralları olarak listelenecek. |
| **Instance Type** | **Hardware Profile** | CPU/RAM konfigürasyonları donanım profili olarak seçtirilecek. |
| **Elastic IP** | **Public IP** | Elastik IP kavramı doğrudan dış IP olarak basitleştirilecek. |

## 2. UI/UX Tasarım Dili ve Yerleşim

Hedef kitle olan geleneksel IT yöneticilerine "güven" ve "otorite" hissi vermek için **"Dark Mode Enterprise"** teması benimsenecektir.

### Tema ve Renk Paleti
*   **Arka Plan:** Koyu Gri / Antrasit (`#1f1f1f`) - Göz yormayan, ciddi zemin.
*   **Vurgu Renkleri:**
    *   **IBM Mavisi (`#0f62fe`):** Birincil aksiyonlar ve başlıklar için. Kurumsallığı temsil eder.
    *   **Matrix Yeşili (`#24a148`):** "Sistem Çalışıyor", "Veri Akışı", "Online" durumları için.
    *   **Kritik Kırmızı (`#da1e28`):** Hata ve "Panic Button" gibi acil durumlar için.
*   **Tipografi:** `Inter` veya `Roboto`. Okunaklı, net ve süslemelerden uzak. Monospace fontlar loglar ve ID'ler için kullanılacak.

### Navigasyon (Sol Panel)
Klasik "Tree View" hiyerarşisi kullanılacaktır. Web sitelerindeki "Mega Menu" veya "Sidebar" yerine, Windows Dosya Gezgini hissiyatı hedeflenir.

*   📂 **Datacenter (Veri Merkezi)**
    *   📂 **Cluster (Küme)**
        *   🖥️ **Host 01 (Engine 1)**
            *   running **Sanal Sunucu 1**
            *   stopped **Sanal Sunucu 2**
        *   🖥️ **Host 02 (Engine 2)**
    *   🗄️ **Storage (Depolama)**
        *   💾 **Datastore-SSD**
        *   💾 **Datastore-Archive**
    *   🌐 **Network (Ağ)**

### Etkileşimler
*   **Sağ Tık Menüleri (Context Menu):** Web hissini kırmak için kritik özellikler sağ tık menüsüne gömülecektir.
    *   *Örnek (VM Üzerinde):* Sağ Tık -> Güç -> Zorla Kapat (Power Off).
    *   *Örnek (Host Üzerinde):* Sağ Tık -> Bakım Moduna Al (Maintenance Mode).
*   **Wizard (Sihirbaz) Modalları:** Karmaşık formlar yerine "İleri > İleri > Tamam" mantığı.
    *   *Yeni VM Oluşturma:* 1. İsim Ver -> 2. Kaynak Seç -> 3. Disk Seç -> 4. Ağ Seç -> 5. Özet ve Bitir.

## 3. Kritik "Killer" Özellikler ve Senaryolar

### A. "Ghost Replication" (Hayalet Replikasyon)
Kullanıcının mevcut VMware altyapısındaki hantallığı, Zadara'nın hızıyla kıyaslamasını sağlayan psikolojik bir özellik.
*   **İşleyiş:** Kullanıcı "Ghost Replicate" butonuna basar. Sistem arka planda bir VM'in Snapshot'ını alır ve Zadara üzerinde aynısını oluşturur (veya simüle eder).
*   **API Mantığı:**
    1.  VMware PowerCLI scripti ile lokal VM özelliklerini oku.
    2.  Zadara `create_vm` API'sine aynı özelliklerle istek at.
    3.  Arayüzde yan yana iki bar göster: "Eski Yapı" (Yavaş yüklenen bar) vs "Yeni Yerli Platform" (Anında dolan yeşil bar).

### B. "Ransomware Panic Button" (Fidye Yazılımı Panik Butonu)
IT Müdürünün en büyük korkusu olan fidye yazılımına karşı "Tek Tuşla Güvenlik" hissi.
*   **İşleyiş:** Dashboard'un sağ üst köşesinde belirgin kırmızı bir buton veya şalter.
*   **API Mantığı (Tetiklendiğinde):**
    1.  Tüm aktif Volume'ler için Zadara `create_snapshot` API'sini döngüye sok.
    2.  Snapshot politikalarını "Immutable" (Değiştirilemez) ve "Read-Only" olarak güncelle.
    3.  Tüm dış ağ trafiğini (Security Group API) "Deny All" kuralına çek (Yönetim portu hariç).
    4.  Arayüzde "Sistem Karantinaya Alındı - Veriler Güvende" bildirimini göster.

### C. "Physical Topology View" (Fiziksel Görünüm)
Bulutun soyutluğunu kırıp, "Donanımım nerede?" sorusunu görsel olarak cevaplayan modül.
*   **İşleyiş:** Ekranda sanal bir server kabini (rack) çizilir.
*   **Görselleştirme:** Kullanıcı bir VM'e tıkladığında, o VM'in diskinin (Volume) hangi Storage Node üzerinde olduğunu, kabinetteki hangi "ışığın" yandığını simüle eder.
*   **Psikoloji:** Kullanıcıya "Data havada uçuşmuyor, bak bu diskte duruyor" güvenini verir. Arka planda Zadara'nın `Show Volume location` API'sinden gelen Node ID bilgisi kullanılır.

## 4. Teknik Mimari (Stack)

### Frontend
*   **Framework:** **React.js** (Geniş kütüphane desteği ve performans için).
*   **UI Kit:** **Ant Design Enterprise** (Dark Theme). Hazır gelen Tree View, Modal ve Table bileşenleri "Enterprise" görünümüne çok uygundur. Profesyonel ve ciddi durur.
*   **State Management:** Redux Toolkit veya Zustand (Karmaşık VM durumlarını yönetmek için).

### Middleware (BFF - Backend for Frontend)
*   **Platform:** **Node.js** (Express veya NestJS).
*   **Görev:** Proxy Katmanı.
    *   Frontend, Zadara API anahtarlarını asla görmez.
    *   Frontend `/api/vmware/create-vm` gibi "sahte" bir endpoint'e istek atar.
    *   Middleware bunu Zadara'nın `/api/vpsa/volumes` ve `/api/zcompute/instances` çağrılarına dönüştürür (zincirleme API çağrıları).
    *   Bu katman, "Wizard" mantığındaki çoklu adımları tek bir işlem gibi yönetir (Orchestration).

### PWA Özellikleri (Servis Worker)
*   **Offline Read-Mode:** İnternet kesse bile IT yöneticisi sunucu listesini ve son durumlarını (Cache'den) görebilir. "Bağlantı koptu, son 5 dakika önceki veriler gösteriliyor" uyarısı ile güven verir.
*   **Push Notifications:** Sunucu kapandığında veya Panic Button aktif edildiğinde, tarayıcı kapalı olsa bile masaüstü bildirimi gönderir.

---
**Not:** Bu tasarım, son kullanıcıya bir "Web Sitesi" değil, bir "Yönetim Konsolu" hissi vermek üzerine kuruludur. Tüm animasyonlar (loading barları, geçişler) hızlı, keskin ve mekanik hissettirmelidir.
