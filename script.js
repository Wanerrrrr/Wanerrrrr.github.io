window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  const landing = document.getElementById('landing');
  const about = document.getElementById('about');

  if (!nav || !landing || !about) return;

  const scrollY = window.scrollY;
  const landingHeight = landing.offsetHeight;

  // 导航栏显示阈值：开始滑动时出现
 if (scrollY > 10) {
    nav.classList.add('show');
    landing.classList.add('hide');
    about.classList.add('show');

    // 自动跳转到 #about，只触发一次（避免无限循环）
    if (!about.classList.contains('scrolled-to')) {
      about.classList.add('scrolled-to');
      about.scrollIntoView({ behavior: 'smooth' });
    }

  } else {
    nav.classList.remove('show');
    landing.classList.remove('hide');
    about.classList.remove('show');
    about.classList.remove('scrolled-to'); // 允许再次触发 scrollIntoView
  }
});

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    // 移除所有 active 类
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    if (targetId === 'home' || targetId === 'landing') {
      // 强制展示 landing，隐藏其他
      document.getElementById('landing')?.classList.remove('hide');
      document.getElementById('about')?.classList.remove('show');

      // 延迟滚动顶部以防止 layout 闪烁
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else if (targetSection) {
      // 其他 section 正常 scrollIntoView
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sectionMap = {};

  navItems.forEach(item => {
    const targetId = item.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      sectionMap[targetId] = {
        item,
        section: targetSection
      };

      // Smooth scroll on click
      item.addEventListener('click', () => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  // Intersection Observer to auto-activate nav item
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;

        navItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.nav-item[data-target="${sectionId}"]`);
        if (activeItem) activeItem.classList.add('active');
      }
    });
  }, observerOptions);

  // Start observing each section
  Object.values(sectionMap).forEach(({ section }) => observer.observe(section));
});

document.querySelectorAll('.works-filter').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // 防止冒泡导致重复触发

    const category = btn.getAttribute('data-category');

    // 显示对应分类的作品卡片
    document.querySelectorAll('.work-card').forEach(card => {
      const match = card.getAttribute('data-category');
      card.style.display = (category === 'all' || match === category) ? 'block' : 'none';
    });

    // ✅ 给 Works 加上 active class
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const worksNavItem = document.querySelector('.works-parent');
    if (worksNavItem) worksNavItem.classList.add('active');
  });
});


// Clicking "Works" jumps to #works and shows all by default
document.querySelector('.works-parent').addEventListener('click', () => {
  document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('.work-card').forEach(card => card.style.display = 'block');
});

