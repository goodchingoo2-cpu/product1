const categoryTags = {
  "korean-lines": ["language", "emotion", "subtitles"],
  "cultural-concepts": ["culture", "context", "social-cues"],
  "scene-meanings": ["scenes", "subtext", "storytelling"]
};

function toExcerpt(content) {
  return content
    .split("\n\n")[0]
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toSearchTerms(title, slug, content) {
  const koreanMatches = content.match(/[가-힣][가-힣\s?!. ,"'()~-]*/g) || [];
  const koreanTerms = koreanMatches
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);

  return [...new Set([title, slug.replace(/-/g, " "), ...koreanTerms])];
}

function buildArticle(entry, index) {
  const excerpt = toExcerpt(entry.content);
  const publishedAt = new Date(Date.UTC(2026, 2, 30 - index, 9, 0, 0)).toISOString();

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    category: entry.category,
    excerpt,
    content: entry.content,
    tags: entry.tags || categoryTags[entry.category] || [],
    searchTerms: entry.searchTerms || toSearchTerms(entry.title, entry.slug, entry.content),
    metaTitle: entry.metaTitle || entry.title,
    metaDescription: entry.metaDescription || excerpt,
    status: "published",
    featured: Boolean(entry.featured),
    publishedAt,
    updatedAt: publishedAt
  };
}

const articleEntries = [
  {
    id: "line-1",
    title: 'What Does "보고 싶었어" Really Mean in Korean?',
    slug: "what-does-bogo-sipeosseo-really-mean",
    category: "korean-lines",
    featured: true,
    content: [
      'When Korean speakers say **보고 싶었어**, the most common English translation is "I missed you." That is not wrong, but it is often incomplete. In many Korean dramas and real-life conversations, this line carries a quieter and heavier emotion than the English phrase usually does.',
      'Literally, **보고 싶었어** means "I wanted to see you." But emotionally, it often means that someone has been holding in longing for a while. The feeling is not always loud. In fact, the line becomes more powerful when it is said softly. That is one reason many foreign viewers feel that this short sentence hits harder than expected.',
      'In Korean culture, emotional sincerity is often expressed through restraint rather than explanation. Instead of saying, "I missed you so much these past few weeks and I could not stop thinking about you," a character may simply say **보고 싶었어**. The shorter line can feel more intimate because the emotion is understood rather than fully explained.',
      'This expression is especially meaningful in reunion scenes, romantic moments, or emotionally distant relationships where one person is finally choosing honesty. Tone matters a lot. Said playfully, it can feel light. Said in a low voice after silence, it can feel deeply romantic.',
      'Foreign viewers sometimes expect a follow-up sentence, but in Korean, the line itself can be emotionally complete. That is why **보고 싶었어** often feels less like a conversation starter and more like a confession of stored-up feeling.',
      'Related expressions include **보고 싶다**, **잘 지냈어?**, and **왜 이제 왔어**. Together, they show how Korean often places emotional weight on simple phrases.'
    ].join("\n\n")
  },
  {
    id: "line-2",
    title: 'What Does "옆에 있어줘" Mean in Korean?',
    slug: "what-does-yeope-isseojwo-mean",
    category: "korean-lines",
    content: [
      'The Korean line **옆에 있어줘** is often translated as "Stay by my side" or "Just stay with me." While that translation is accurate, the emotional meaning in Korean culture can be more specific and more tender.',
      'This phrase usually appears when someone is hurting, overwhelmed, or emotionally exhausted. What makes it powerful is that it does not ask for a solution. It does not ask for advice. It asks for presence. In Korean emotional culture, simply staying near someone can itself be a meaningful form of love and comfort.',
      'That is why **옆에 있어줘** often feels so intense in dramas. It is not dramatic because the words are big. It is dramatic because the request is small and vulnerable. The speaker is saying, in effect, "You do not need to fix my pain. I just do not want to be alone in it."',
      'In many English-speaking cultures, emotional support is often expressed through talking, explaining, or offering practical help. In Korean scenes, however, silence and physical presence may carry equal or greater emotional weight. A character sitting beside another character without speaking can be one of the strongest comfort scenes in a story.',
      'This line is especially common in romantic, family, and friendship scenes. It creates intimacy because it reveals trust. You only ask someone to stay close if their presence matters.',
      'Related expressions include **가지 마**, **내 옆에 있어**, and **아무 말 하지 말고 그냥 있어줘**. All of them show how deeply Korean can value quiet companionship.'
    ].join("\n\n")
  },
  {
    id: "line-3",
    title: 'Why Do Koreans Say "밥 먹었어?"',
    slug: "why-do-koreans-say-bap-meogeosseo",
    category: "korean-lines",
    content: [
      'To many foreigners, **밥 먹었어?** sounds like a simple question: "Did you eat?" But in Korean culture, it often functions as much more than that. Depending on tone and context, it can mean "How are you?", "Have you been taking care of yourself?", or even "I care about you."',
      'Food is deeply tied to affection in Korean life. Asking whether someone has eaten is a practical question, but it is also an emotional one. It reflects concern for a person\'s well-being in a very everyday way. Rather than asking directly about emotions, Korean speakers often show care through small, concrete expressions.',
      'That is one reason this phrase appears so often in dramas and daily speech. Between family members, it can feel nurturing. Between romantic partners, it can sound warm and intimate. Between older and younger people, it can also reflect concern and responsibility.',
      'Foreign viewers sometimes misunderstand the line because the direct English translation sounds plain. But in Korean, its emotional meaning depends on relationship and tone. If someone checks whether you ate after a hard day, they are not only asking about food. They are showing attention.',
      'This expression also reflects the broader role of meals in Korean relationships. Eating together matters. Offering food matters. Remembering whether someone ate matters. These small actions help define closeness.',
      'Related expressions include **밥 잘 챙겨 먹어**, **식사하셨어요?**, and **뭐 먹었어?**. All of them reveal how food and care are closely connected in Korean culture.'
    ].join("\n\n")
  },
  {
    id: "line-4",
    title: 'Why Does "됐어" Not Always Mean "It\'s Fine"?',
    slug: "why-does-dwaesseo-not-mean-its-fine",
    category: "korean-lines",
    content: [
      'The Korean phrase **됐어** is tricky because its literal meaning is close to "It\'s done," "That\'s enough," or "It\'s fine." But emotionally, it often means something much sharper. In many dramatic scenes, **됐어** can actually signal disappointment, emotional shutdown, or refusal.',
      'This is why foreign viewers can easily misread it. A subtitle may say "It\'s fine," but the tone, facial expression, and situation often say the opposite. In Korean, emotional meaning frequently comes from delivery rather than dictionary definition.',
      'When someone says **됐어** gently, it may simply mean "No thanks" or "That\'s okay." But when it is said after hurt or conflict, it can mean "Forget it," "I\'m done talking," or "You do not understand, and I\'m tired." The emotional force comes from finality.',
      'This line is powerful because Korean communication often leaves feelings implied rather than fully explained. Instead of arguing in detail, a character may say **됐어** and stop the conversation. That withdrawal itself becomes the emotional message.',
      'In dramas, **됐어** often appears in breakup scenes, family conflicts, or moments when one person no longer wants to explain their pain. It is short, but it can feel cold, sad, or resigned.',
      'Related expressions include **이제 됐어**, **그만해**, and **됐으니까 가**. Together, they show how Korean short phrases can carry emotional complexity far beyond their literal translation.'
    ].join("\n\n")
  },
  {
    id: "line-5",
    title: 'What Does "그냥" Mean in Emotional Korean Scenes?',
    slug: "what-does-geunyang-mean-in-emotional-scenes",
    category: "korean-lines",
    content: [
      'The word **그냥** is usually translated as "just" or "for no reason." On paper, it seems simple. In Korean emotional scenes, however, **그냥** can hold far more meaning than the literal translation suggests.',
      'Imagine a character showing up late at night and being asked, "Why did you come?" If the answer is **그냥**, the direct meaning is "Just because." But emotionally, the line often suggests something deeper: "I missed you," "I was thinking about you," or "I did not know how else to explain it."',
      'Korean often allows emotion to remain partially unspoken. Instead of clearly describing every motive, a speaker may use a small word that invites the listener to understand the hidden feeling. That is why **그냥** can feel intimate, sad, awkward, or romantic depending on context.',
      'In English, "just because" can sound casual or dismissive. In Korean, **그냥** can feel emotionally loaded, especially when spoken softly or after hesitation. It may reflect vulnerability because the speaker is revealing feeling without fully naming it.',
      'This line is especially common in romance and reunion scenes. The less a character says, the more viewers are invited to read emotion into the silence. That is part of why Korean dialogue can feel so subtle and powerful.',
      'Related expressions include **아니, 그냥**, **별거 아니야**, and **문득 생각나서**. All of them show how Korean often uses understatement to carry strong emotion.'
    ].join("\n\n")
  },
  {
    id: "line-6",
    title: 'What Does "내 사람이야" Mean?',
    slug: "what-does-nae-saramiya-mean",
    category: "korean-lines",
    content: [
      'The phrase **내 사람이야** is often translated as "That\'s my person." At first glance, foreign viewers may hear possession in that line. But in Korean emotional language, the phrase usually means something closer to loyalty, protection, and chosen closeness.',
      'It does not usually suggest ownership in the literal sense. Instead, it can imply, "This is someone I will stand by," "This person matters to me," or "I take this bond seriously." Depending on the scene, it may sound romantic, protective, or deeply affectionate.',
      'What makes this phrase emotionally strong is the word **사람**. In Korean, calling someone "my person" can feel more meaningful than using labels alone. It frames the relationship not as a title, but as a bond. The phrase often appears in scenes where someone is defending, claiming, or emotionally affirming another person.',
      'In dramas, **내 사람이야** can be romantic, but it can also appear in friendship or family-like contexts. It suggests chosen responsibility. That is why it feels heavier than a casual "He\'s mine" or "She\'s mine."',
      'Foreign viewers sometimes misunderstand the line because the English wording sounds more possessive. But in Korean, the emotional subtext is often about presence and protection rather than control.',
      'Related expressions include **내 편이야**, **내 곁에 있는 사람**, and **지켜줄게**. Together, they reveal how Korean relationship language often emphasizes loyalty over direct declaration.'
    ].join("\n\n")
  },
  {
    id: "line-7",
    title: 'What Does "서운해" Mean in Korean?',
    slug: "what-does-seounhae-mean",
    category: "korean-lines",
    content: [
      'The Korean word **서운해** is difficult to translate perfectly into English. It can sound like disappointment, hurt, sadness, or feeling let down, but none of those fully capture it.',
      'Usually, **서운해** describes the feeling that arises when someone you care about fails to meet an emotional expectation. It is not as explosive as anger and not as dramatic as betrayal. Instead, it sits in the emotional space between closeness and hurt.',
      'That is why the word matters so much in Korean relationships. You usually feel **서운해** toward someone who matters. If a stranger disappoints you, that is one thing. If someone close to you forgets you, ignores you, or does not understand your feelings, that becomes **서운함**.',
      'In English, people might say "I\'m hurt," "I\'m disappointed," or "That made me sad." But **서운해** often implies, "I expected more from you because we are close." The emotional pain comes from the relationship itself.',
      'In dramas, this line often appears in quiet arguments, friendship misunderstandings, and romantic tension. It signals emotional injury without fully turning the conflict into rage.',
      'Related expressions include **속상해**, **섭섭해**, and **실망했어**. They overlap, but **서운해** carries a distinct sense of hurt tied to closeness.'
    ].join("\n\n")
  },
  {
    id: "line-8",
    title: 'What Does "속상해" Mean?',
    slug: "what-does-soksanghae-mean",
    category: "korean-lines",
    content: [
      'The Korean expression **속상해** is commonly translated as "I\'m upset" or "I feel bad," but the emotional texture is more specific. It often describes a painful heaviness inside the heart, especially when something sad, frustrating, or unfair has happened.',
      'The word comes from **속**, meaning one\'s inside or inner feelings. So **속상해** suggests that the distress is inward. It is less about outward anger and more about inner emotional pain. That makes it common in scenes where someone is silently hurt, exhausted, or unable to express everything directly.',
      'In family and romance scenes, **속상해** often appears when someone has been disappointed or emotionally worn down. It can also be used when bad things happen to someone you care about. In that sense, it reflects empathy as well as personal pain.',
      'Foreign viewers may confuse **속상해** with simple sadness, but it often includes frustration, helplessness, and emotional strain. It is especially common in Korean because the language has many nuanced ways of describing internal feeling states.',
      'Related expressions include **서운해**, **마음이 아파**, and **답답해**. Each one highlights a slightly different emotional shade, which is part of what makes Korean emotional dialogue so rich.'
    ].join("\n\n")
  },
  {
    id: "line-9",
    title: 'What Does "어떡해" Mean in Conversation?',
    slug: "what-does-eotteokhae-mean",
    category: "korean-lines",
    content: [
      'The Korean phrase **어떡해** literally means something like "What do I do?" But in actual conversation, especially in dramas, it often means much more than a request for practical advice.',
      'When someone says **어떡해** after hearing bad news, it can express shock, sympathy, worry, or emotional overwhelm. In many cases, the speaker is not truly asking for a solution. They are reacting emotionally and showing that they feel the seriousness of the moment.',
      'That is why foreign viewers sometimes find the expression confusing. In English, "What do I do?" sounds like a direct question about action. In Korean, **어떡해** can function as an emotional response. It often communicates, "This is terrible," "I feel for you," or "I do not know how to process this."',
      'The phrase becomes especially powerful in friendship and family scenes. It shows involvement in someone else\'s pain. The speaker\'s problem is not always the main point. Shared emotional reaction is.',
      'Related expressions include **어떡하지**, **큰일 났다**, and **이걸 어떡해**. Together, they reveal how Korean often uses question forms to express emotion rather than literal requests.'
    ].join("\n\n")
  },
  {
    id: "line-10",
    title: 'What Does "고생했어" Mean?',
    slug: "what-does-gosaenghaesseo-mean",
    category: "korean-lines",
    content: [
      'The phrase **고생했어** is often translated as "You worked hard" or "You\'ve been through a lot." Both are close, but the emotional range of the line in Korean is broader and warmer.',
      'This phrase recognizes effort, endurance, and hardship. It does not only praise achievement. It acknowledges what someone had to go through. That is why **고생했어** can feel deeply comforting, especially after stress, emotional pain, or a long period of struggle.',
      'In Korean culture, endurance often carries emotional meaning. People do not always speak openly about pain while they are going through it. So when someone later says **고생했어**, they are not just commenting on work. They are honoring what the other person silently carried.',
      'This line appears often in family scenes, romantic comfort scenes, and endings where someone is finally seen and understood. It can be more touching than praise because it recognizes suffering as well as effort.',
      'Related expressions include **수고했어**, **고생 많았어**, and **힘들었지**. They all express care, but **고생했어** has a particularly soft emotional weight.'
    ].join("\n\n")
  },
  {
    id: "line-11",
    title: 'What Does "미치겠다" Mean When It’s Not Literal?',
    slug: "what-does-michigetta-mean",
    category: "korean-lines",
    content: [
      'The Korean phrase **미치겠다** literally relates to "going crazy," but in everyday Korean it is often used figuratively to express overwhelming emotion. It can signal frustration, excitement, admiration, embarrassment, exhaustion, or longing.',
      'This wide emotional range surprises many foreign viewers. In English, "I\'m going crazy" often sounds alarming. In Korean, **미치겠다** is a dramatic emotional amplifier. It means the feeling is too big for ordinary words.',
      'A person may say **너무 좋아서 미치겠다** when something is so good it becomes unbearable in a playful way. They may also say it when they are stressed, annoyed, or lovesick. The key idea is intensity.',
      'This is one reason the phrase appears so often in dramas and everyday speech. Korean has many expressions that stretch literal meaning to communicate emotional force. Tone and context tell you whether the phrase is funny, desperate, angry, or affectionate.',
      'Related expressions include **돌겠어**, **미치겠네**, and **죽겠다**. None of them should always be read literally. Instead, they often function as culturally familiar ways of dramatizing strong feeling.'
    ].join("\n\n")
  },
  {
    id: "line-12",
    title: 'What Does "아쉽다" Mean?',
    slug: "what-does-aswipda-mean",
    category: "korean-lines",
    content: [
      'The Korean word **아쉽다** is often translated as "It\'s a shame" or "That\'s too bad," but it carries a softer and more nuanced feeling. It usually describes regret over something that was good, meaningful, or promising but somehow incomplete, missed, or ending.',
      'Unlike strong sadness, **아쉽다** often contains appreciation as well as regret. You say it when something good was not enough, ended too soon, or did not fully happen the way you hoped.',
      'This makes it a common word in Korean everyday life and storytelling. It can be used about relationships, opportunities, meals, performances, conversations, or timing. It is emotionally flexible and often understated.',
      'Foreign learners sometimes search for a perfect English equivalent, but the emotional feel of **아쉽다** lies between disappointment and lingering fondness. You are sad, but not devastated. You wanted just a little more.',
      'Related expressions include **아깝다**, **섭섭하다**, and **아쉬워 죽겠다**. Together, they show how Korean captures small shades of emotional loss.'
    ].join("\n\n")
  },
  {
    id: "line-13",
    title: 'What Does "조심히 가" Mean?',
    slug: "what-does-josimhi-ga-mean",
    category: "korean-lines",
    content: [
      'The phrase **조심히 가** is often translated as "Go safely" or "Take care on your way." It is simple, but in Korean it often carries genuine warmth and care.',
      'This expression matters because it reflects concern through practical language. Instead of saying something openly emotional, a speaker expresses care by wishing for safety. This fits a broader Korean communication style in which affection is often shown through everyday consideration.',
      'In dramas, **조심히 가** can become especially meaningful when said after an emotionally important meeting. It may function as a restrained version of "I still care about you." The line becomes more touching because it sounds ordinary while carrying emotional subtext.',
      'Related expressions include **들어가**, **잘 가**, and **집에 가서 연락해**. Each one can sound casual on the surface but affectionate underneath.'
    ].join("\n\n")
  },
  {
    id: "line-14",
    title: 'What Does "다녀왔어" Mean Culturally?',
    slug: "what-does-danyeowasseo-mean-culturally",
    category: "korean-lines",
    content: [
      'The phrase **다녀왔어** means "I\'m back" or "I came back," but in Korean daily life it belongs to a familiar emotional pair with **다녀오세요**. Together, these phrases reflect home, routine, and belonging.',
      'When someone says **다녀왔어** after returning home, the emotional value often lies in the expectation that someone is there to receive you. Likewise, **다녀오세요** is more than "bye." It carries the feeling of sending someone out safely and expecting their return.',
      'That is why these phrases matter in Korean dramas. They can make a home scene feel warm, lonely, or heartbreaking depending on who says them and who does not. A quiet **다녀왔어** in an empty house can signal isolation. A cheerful exchange at the doorway can signal comfort and family intimacy.',
      'Foreign viewers may see them as routine greetings, but in Korean they can symbolize emotional stability and everyday love.'
    ].join("\n\n")
  },
  {
    id: "line-15",
    title: 'What Does "괜찮아" Really Mean?',
    slug: "what-does-gwaenchana-really-mean",
    category: "korean-lines",
    content: [
      'The Korean phrase **괜찮아** is often translated as "It\'s okay" or "I\'m fine." But like many common Korean expressions, its real meaning depends heavily on tone, timing, and relationship.',
      'Sometimes **괜찮아** really does mean reassurance. It can comfort someone, reduce tension, or say that no apology is needed. But in other scenes, it may hide hurt, refusal, or emotional distance. A character may say **괜찮아** precisely because they do not want to reveal how much they are affected.',
      'This dual nature is important in Korean emotional communication. Direct emotional expression is not always the default. People may soften or conceal feeling through polite or calm language. That makes short phrases carry layered meaning.',
      'In dramas, subtitles often flatten **괜찮아** into one English equivalent. But viewers need to read the face, pause, and context to understand what the line is doing.',
      'Related expressions include **괜찮아요**, **됐어**, and **신경 쓰지 마**. Each can be gentle or emotionally defensive depending on delivery.'
    ].join("\n\n")
  },
  {
    id: "line-16",
    title: 'What Does "왜 왔어" Mean Emotionally?',
    slug: "what-does-wae-wasseo-mean-emotionally",
    category: "korean-lines",
    content: [
      'The line **왜 왔어** literally means "Why did you come?" But in Korean dramas, it often means much more than a request for information. Depending on tone, it can sound angry, startled, hurt, relieved, or secretly glad.',
      'This is a good example of how Korean emotional language often hides true feeling beneath a simple question. A character may ask **왜 왔어** not because they truly want an explanation, but because they are overwhelmed by the other person\'s sudden presence.',
      'When spoken in a tense reunion scene, the line may actually imply, "Why now?" "Why after all this time?" or even "Why did you come when I still care?" The emotional weight comes from what remains unsaid.',
      'Foreign viewers may expect direct dialogue, but Korean storytelling often lets conflict and longing appear through short, ambiguous lines. That is one reason scenes can feel emotionally thick even when the dialogue is minimal.'
    ].join("\n\n")
  },
  {
    id: "line-17",
    title: 'What Does "가지 마" Feel Like in Korean Dramas?',
    slug: "what-does-gaji-ma-feel-like",
    category: "korean-lines",
    content: [
      'The phrase **가지 마** simply means "Don\'t go." Yet in Korean dramas, it is one of the most emotionally loaded short lines. It can express fear, attachment, desperation, dependence, or love.',
      'What makes the line powerful is its directness. Korean emotional speech is often restrained, so a character saying **가지 마** can feel like a moment when restraint finally breaks. The line becomes especially intense if the speaker is someone who normally hides emotion.',
      'Because it is so short, everything depends on context. In some scenes it is romantic. In others it is heartbreaking. Sometimes it means "Stay with me." Sometimes it means "Don\'t leave me alone with this pain."',
      'Foreign viewers often understand the literal meaning easily, but the emotional force can still surprise them. The line is not dramatic because it is long. It is dramatic because it exposes need.'
    ].join("\n\n")
  },
  {
    id: "line-18",
    title: 'What Does "힘내" Mean Emotionally?',
    slug: "what-does-himnae-mean-emotionally",
    category: "korean-lines",
    content: [
      'The Korean phrase **힘내** is often translated as "Cheer up" or "Be strong." But in Korean usage, it can sound softer and more supportive than those English equivalents suggest.',
      'At its core, **힘내** means "Gather your strength." It is used when someone is tired, hurt, discouraged, or struggling. Depending on tone, it can be affectionate, encouraging, or slightly formal.',
      'Foreign viewers sometimes feel that "cheer up" sounds too light in English. In Korean, **힘내** often feels closer to "I know this is hard, but keep going." It is not about denying pain. It is about lending emotional energy.',
      'This phrase reflects an important aspect of Korean comfort language: encouragement often comes in compact forms. The words are short, but the emotional intention can be sincere and strong.'
    ].join("\n\n")
  },
  {
    id: "line-19",
    title: 'What Does "알았어" Mean Depending on Tone?',
    slug: "what-does-arasseo-mean-depending-on-tone",
    category: "korean-lines",
    content: [
      'The Korean phrase **알았어** literally means "I got it" or "Okay." But depending on tone, it can sound warm, annoyed, resigned, obedient, affectionate, or cold.',
      'This makes it one of the most flexible everyday expressions in Korean. Said softly, it can mean "Okay, I understand." Said sharply, it can mean "Fine." Said in an emotional scene, it may imply acceptance without real peace.',
      'Because Korean relies so much on tone and relational context, a simple phrase like **알았어** can carry very different emotional effects. That is why subtitles alone do not always capture the full meaning.'
    ].join("\n\n")
  },
  {
    id: "line-20",
    title: 'What Does "너밖에 없어" Mean in Korean?',
    slug: "what-does-neobakke-eopseo-mean",
    category: "korean-lines",
    content: [
      'The phrase **너밖에 없어** means "There\'s no one but you" or "You\'re all I have." In Korean drama language, it can sound intensely romantic, but it may also carry loneliness or emotional dependence.',
      'This line is powerful because it combines affection with vulnerability. The speaker is not only praising the other person. They are revealing need. That makes the line emotionally risky and intimate.',
      'In Korean storytelling, such lines often appear at turning points, when a character can no longer hide how central another person has become. Depending on the scene, the phrase may feel beautiful, tragic, or overwhelming.',
      'Related expressions include **너뿐이야**, **나한텐 너밖에 없어**, and **내 편은 너밖에 없어**. All of them show how Korean short lines can hold both devotion and emotional exposure.'
    ].join("\n\n")
  },
  {
    id: "concept-1",
    title: "What Is Jeong in Korean Culture?",
    slug: "what-is-jeong-in-korean-culture",
    category: "cultural-concepts",
    featured: true,
    content: [
      'The Korean concept **정 (jeong)** is one of the most discussed and least perfectly translatable ideas in Korean culture. It is often described as affection, attachment, warmth, or emotional bond, but none of those words fully capture it.',
      'Jeong grows over time. It is not always dramatic or verbal. It builds through repeated care, shared routine, quiet loyalty, and lived closeness. You can feel jeong toward family, friends, neighbors, places, and even objects connected to memory.',
      'What makes jeong distinct is that it often combines love, concern, familiarity, and responsibility. It can exist even when a relationship is imperfect. In fact, part of jeong is staying emotionally tied through time and shared life rather than through ideal conditions.',
      'In Korean dramas, viewers often sense jeong in the small acts: someone bringing food, checking whether another person got home, staying nearby in silence, or continuing to care even after conflict. These actions may look ordinary, but they carry emotional depth.',
      'Foreign viewers sometimes search for a direct English equivalent, but jeong is better understood as a cultural pattern of attachment. It is one reason Korean stories often give emotional importance to routine care and long familiarity.',
      'Related ideas include **정들다** (to grow attached), **미운 정, 고운 정** (different shades of attachment), and **의리** (loyalty). Together, they show how Korean emotional culture values durable bonds.'
    ].join("\n\n")
  },
  {
    id: "concept-2",
    title: "What Is Han?",
    slug: "what-is-han",
    category: "cultural-concepts",
    content: [
      'The Korean concept **한 (han)** is often explained as a deep, accumulated sorrow shaped by loss, injustice, longing, and endurance. It is one of the most discussed emotional concepts in Korean culture, but it is also one of the hardest to define neatly.',
      'Han is not just sadness. It often includes grief, resentment, helplessness, and persistence all at once. It is the feeling of carrying pain that cannot be easily resolved. That is why it appears so often in Korean literature, film, and historical discussions.',
      'In storytelling, han may show up not through loud anger but through quiet endurance. A character who has suffered for years without full release may be seen as carrying han. The emotion can be personal, familial, or collective.',
      'Foreign viewers should be careful not to romanticize the concept too simply. Han is not just beautiful sadness. It reflects real historical memory, social struggle, and emotional survival.',
      'Related ideas include **설움**, **억울함**, and **그리움**. Han often overlaps with these emotions but carries a broader depth and historical resonance.'
    ].join("\n\n")
  },
  {
    id: "concept-3",
    title: "What Is Nunchi?",
    slug: "what-is-nunchi",
    category: "cultural-concepts",
    content: [
      'The word **눈치 (nunchi)** is often translated as "social awareness" or "reading the room." In Korean culture, it refers to the ability to sense other people\'s feelings, intentions, mood, and social dynamics without everything being stated directly.',
      'Nunchi matters because Korean communication often values sensitivity to context. Instead of saying everything openly, people may expect others to notice tone, timing, facial expression, hierarchy, and atmosphere. Good nunchi helps relationships run smoothly.',
      'In dramas, characters with strong nunchi quickly understand what is not being said. Characters with poor nunchi may miss emotional signals or create awkward situations.',
      'Foreign viewers sometimes see this as indirectness, but from within Korean culture, nunchi can also be seen as thoughtfulness. It means paying attention to others rather than only asserting yourself.'
    ].join("\n\n")
  },
  {
    id: "concept-4",
    title: "What Is Chemyeon in Korean Culture?",
    slug: "what-is-chemyeon-in-korean-culture",
    category: "cultural-concepts",
    content: [
      'The Korean concept **체면 (chemyeon)** is often translated as "face," dignity, or social image. It refers to how a person is seen by others and the desire to maintain respectability and self-control in social settings.',
      'Chemyeon matters because relationships in Korean society are often shaped by mutual awareness of status, role, and public impression. Protecting someone\'s chemyeon can mean avoiding public embarrassment, speaking tactfully, or handling conflict indirectly.',
      'In dramas, many decisions that seem emotionally frustrating to foreign viewers make more sense when chemyeon is considered. A character may avoid confessing, apologizing, or confronting someone directly because the social cost feels high.',
      'Understanding chemyeon helps explain why public shame, formal tone, and indirect conflict can be so emotionally powerful in Korean scenes.'
    ].join("\n\n")
  },
  {
    id: "concept-5",
    title: "Why Is Silence So Important in Korean Communication?",
    slug: "why-is-silence-important-in-korean-communication",
    category: "cultural-concepts",
    content: [
      'In many Korean conversations and dramatic scenes, silence is not empty. It often carries emotional meaning. Silence can express pain, hesitation, respect, embarrassment, affection, or emotional restraint.',
      'This is one reason foreign viewers sometimes feel that Korean scenes are intense even when very few words are spoken. The emotional message is often carried by pause, eye contact, breathing, posture, and what is left unsaid.',
      'Silence matters partly because Korean communication can be context-heavy. Rather than always explaining feelings directly, speakers may rely on shared understanding. In close relationships, silence can even signal comfort.',
      'A character sitting quietly beside another person may be offering support. A delayed answer may reveal emotional conflict. A silent meal may express distance or sorrow.',
      'To understand Korean scenes well, viewers often need to listen not only to words but also to stillness.'
    ].join("\n\n")
  },
  {
    id: "concept-6",
    title: "Why Does Food Mean Care in Korean Culture?",
    slug: "why-does-food-mean-care-in-korean-culture",
    category: "cultural-concepts",
    content: [
      'Food carries emotional meaning in Korean culture far beyond nutrition. Offering food, asking whether someone has eaten, preparing a meal, or sending food home can all function as expressions of affection and care.',
      'This is one reason meals are so important in Korean dramas. Characters do not only eat to move the plot forward. Shared food can signal comfort, apology, romance, family warmth, or reconciliation.',
      'Care in Korean life is often shown through action rather than verbal declaration. Cooking for someone may mean "I\'m worried about you," "I love you," or "I want to take care of you" without those words being spoken directly.',
      'That is why a simple bowl of soup or side dish can feel deeply emotional in K-content.'
    ].join("\n\n")
  },
  {
    id: "concept-7",
    title: "What Is the Difference Between Jondaetmal and Banmal?",
    slug: "difference-between-jondaetmal-and-banmal",
    category: "cultural-concepts",
    content: [
      'Korean has different speech levels, and one of the most important distinctions is between **존댓말 (jondaetmal)** and **반말 (banmal)**. Jondaetmal is polite or respectful speech, while banmal is casual, intimate speech.',
      'This difference is not only grammatical. It reflects relationship, age, hierarchy, distance, and emotional tone. Changing from jondaetmal to banmal can signal closeness, tension, romance, or disrespect depending on the situation.',
      'Foreign viewers often notice tone shifts without fully understanding why they matter so much. In Korean, language itself helps define the relationship. That is why a formal tone can create distance, while casual speech can feel warm or bold.',
      'Learning this distinction helps explain many emotional moments in Korean dramas and real-life conversation.'
    ].join("\n\n")
  },
  {
    id: "concept-8",
    title: "Why Is Indirect Communication Common in Korea?",
    slug: "why-is-indirect-communication-common-in-korea",
    category: "cultural-concepts",
    content: [
      'Korean communication often values subtlety and context. This does not mean Koreans never speak directly, but it does mean that indirect expression can play an important role in preserving harmony, showing tact, or protecting feelings.',
      'Instead of saying exactly what they feel in blunt terms, people may use softer wording, hints, pauses, or practical phrases. This can frustrate some foreign viewers, but within Korean culture, such indirectness may be seen as emotionally considerate.',
      'Indirect communication is closely tied to hierarchy, chemyeon, and nunchi. Understanding these concepts makes many Korean scenes feel much more coherent.'
    ].join("\n\n")
  },
  {
    id: "concept-9",
    title: "Why Do Korean Couples Express Affection Subtly?",
    slug: "why-do-korean-couples-express-affection-subtly",
    category: "cultural-concepts",
    content: [
      'Compared with some Western media, Korean romance often appears emotionally restrained. Couples may express affection through waiting, checking in, sharing food, remembering details, or staying nearby rather than through grand speeches.',
      'This subtle style does not mean the love is weaker. In many cases, it means emotional sincerity is shown through consistency and action rather than declaration. Small gestures become meaningful because they are attentive and relational.',
      'That is why foreign viewers may eventually find Korean romance especially moving. The emotional build is often slower, but the reward feels deeper because affection is shown through care.'
    ].join("\n\n")
  },
  {
    id: "concept-10",
    title: "Why Are Confessions So Important in Korean Dating Culture?",
    slug: "why-are-confessions-important-in-korean-dating-culture",
    category: "cultural-concepts",
    content: [
      'In Korean dating culture, the idea of a clear **confession** is openly saying you like someone and asking to define the relationship. This is why confession scenes matter so much in Korean dramas.',
      'The confession is not only romantic. It is relationally clarifying. It marks a shift from ambiguity to acknowledged feeling. Because Korean communication can sometimes be subtle, an explicit confession becomes an emotionally important event.',
      'This is also why viewers often treat confession scenes as a major turning point rather than just one step in casual dating.'
    ].join("\n\n")
  },
  {
    id: "concept-11",
    title: "Why Is Waiting Romantic in Korean Stories?",
    slug: "why-is-waiting-romantic-in-korean-stories",
    category: "cultural-concepts",
    content: [
      'Waiting carries strong romantic meaning in many Korean stories. A character who waits outside a home, in the rain, at a station, through years, or through emotional distance is showing constancy and seriousness.',
      'This reflects a broader emotional pattern in Korean storytelling: patience can be a form of love. Rather than pushing forward loudly, a character proves feeling by staying emotionally present over time.',
      'Foreign viewers may see waiting as passive, but in K-content it often feels active and loyal.'
    ].join("\n\n")
  },
  {
    id: "concept-12",
    title: "Why Is Emotional Restraint Valued in Korean Storytelling?",
    slug: "why-is-emotional-restraint-valued-in-korean-storytelling",
    category: "cultural-concepts",
    content: [
      'Many Korean dramas create strong feeling not by making characters speak more, but by making them hold back. Emotional restraint allows tension to build, subtext to deepen, and small gestures to matter.',
      'This reflects both storytelling style and cultural communication patterns. Feelings are not always less intense because they are less verbal. Sometimes they feel more intense precisely because they are difficult to say.',
      'That is why a trembling pause, a quiet goodbye, or one short line can feel emotionally huge in Korean scenes.'
    ].join("\n\n")
  },
  {
    id: "concept-13",
    title: "Why Does Staying Beside Someone Matter So Much?",
    slug: "why-does-staying-beside-someone-matter-so-much",
    category: "cultural-concepts",
    content: [
      'In Korean emotional culture, presence often matters more than explanation. Staying beside someone in silence can show solidarity, love, and care. It means "I am here with you" even when words feel useless.',
      'This is why comforting scenes in Korean dramas are often physically still. The emotional message comes from remaining present, not solving the problem.'
    ].join("\n\n")
  },
  {
    id: "concept-14",
    title: "Why Are Family Titles So Important in Korea?",
    slug: "why-are-family-titles-important-in-korea",
    category: "cultural-concepts",
    content: [
      'Korean uses many family and relational titles that reflect age, gender, and role. These titles matter because they express social structure and emotional closeness at the same time.',
      'Using the right term is not only linguistic. It shows awareness of relationship and respect. That is why family address in Korean often feels richer and more specific than in English.'
    ].join("\n\n")
  },
  {
    id: "concept-15",
    title: "Why Do Korean Mothers Show Love Through Food?",
    slug: "why-do-korean-mothers-show-love-through-food",
    category: "cultural-concepts",
    content: [
      'One of the most recognizable emotional patterns in Korean culture is a mother expressing care through food. Cooking, preparing side dishes, packing food, and urging someone to eat are common ways of showing concern.',
      'This form of love can seem indirect to foreign viewers, but it is often deeply sincere. In many families, food becomes a language of care.'
    ].join("\n\n")
  },
  {
    id: "concept-16",
    title: "Why Is Public Embarrassment So Powerful in Korean Scenes?",
    slug: "why-is-public-embarrassment-so-powerful-in-korean-scenes",
    category: "cultural-concepts",
    content: [
      'Because social image and relational harmony matter strongly in Korean settings, public embarrassment can carry intense emotional force. A person may feel not only personal shame but also damage to dignity and status.',
      'This is one reason humiliating scenes in Korean dramas can feel especially sharp. The pain is social as well as emotional.'
    ].join("\n\n")
  },
  {
    id: "concept-17",
    title: "Why Do Koreans Use Two Hands When Giving Things?",
    slug: "why-do-koreans-use-two-hands-when-giving-things",
    category: "cultural-concepts",
    content: [
      'Using two hands when giving or receiving something, especially with elders or in formal situations, is a sign of respect in Korean culture. It reflects attentiveness to hierarchy and etiquette.',
      'Small gestures like this matter because respect is often communicated through behavior as much as language.'
    ].join("\n\n")
  },
  {
    id: "concept-18",
    title: "Why Do Apologies Sound Longer in Korean?",
    slug: "why-do-apologies-sound-longer-in-korean",
    category: "cultural-concepts",
    content: [
      'Korean apologies can sound longer or more layered than English ones because they often aim not only to admit fault but also to acknowledge burden, emotional damage, and social discomfort.',
      'This fits a relational view of conflict. The speaker may be apologizing for what happened, how it affected the other person, and the strain it caused in the relationship.'
    ].join("\n\n")
  },
  {
    id: "concept-19",
    title: "Why Does Group Harmony Matter in Korea?",
    slug: "why-does-group-harmony-matter-in-korea",
    category: "cultural-concepts",
    content: [
      'Group harmony is an important value in many Korean social settings. This does not mean individuality disappears, but it does mean that awareness of the group often shapes how people speak, disagree, and make decisions.',
      'This helps explain why direct confrontation can feel socially costly and why emotional sensitivity to others matters so much.'
    ].join("\n\n")
  },
  {
    id: "concept-20",
    title: "Why Is Endurance Admired in Korean Culture?",
    slug: "why-is-endurance-admired-in-korean-culture",
    category: "cultural-concepts",
    content: [
      'Endurance is often respected in Korean culture because it reflects strength, patience, and responsibility. Stories frequently honor characters who quietly carry hardship for others or keep going through pain.',
      'This admiration can be moving, but it can also create emotional tension. Characters who endure too much may become tragic or deeply sympathetic. Understanding this helps explain why Korean narratives often give such weight to silent perseverance.'
    ].join("\n\n")
  },
  {
    id: "scene-1",
    title: "Why Is Silence Romantic in Korean Dramas?",
    slug: "why-is-silence-romantic-in-korean-dramas",
    category: "scene-meanings",
    featured: true,
    content: [
      'Silence in Korean dramas often feels romantic because it creates space for unspoken emotion. Instead of filling every moment with explanation, the scene allows viewers to sense what the characters cannot fully say.',
      'In many Korean love stories, emotional sincerity is expressed through restraint. A pause, a held gaze, or simply staying present can feel more intimate than a long speech. The silence suggests trust: both people understand that something meaningful is happening even without direct wording.',
      'Foreign viewers sometimes expect romantic scenes to be more verbal. But in Korean storytelling, silence can feel emotionally richer because it lets longing, hesitation, and tenderness exist at the same time.',
      'This is especially true in reunion scenes, confessions that almost happen, and comfort scenes where one person quietly stays beside the other. The stillness becomes the language.',
      'That is why silence in Korean dramas is not empty. It often functions as emotional proof. If two characters can share a meaningful silence, the relationship itself feels deeper.'
    ].join("\n\n")
  },
  {
    id: "scene-2",
    title: "Why Is a Wordless Hug So Emotional?",
    slug: "why-is-a-wordless-hug-so-emotional",
    category: "scene-meanings",
    content: [
      'A wordless hug in Korean dramas often feels powerful because it communicates comfort, apology, longing, and acceptance all at once. The lack of dialogue does not weaken the scene. In many cases, it strengthens it.',
      'When someone hugs another person without speaking, the viewer is invited to focus on what words are no longer able to do. The hug becomes a response to pain, distance, or reunion. It can mean "I am here," "I forgive you," "I missed you," or "You are safe now."',
      'In Korean emotional storytelling, physical closeness often matters more when it arrives after restraint. A character who rarely expresses emotion may reveal everything through one silent embrace. That makes the moment feel earned.',
      'Foreign viewers may be surprised by how little dialogue is used, but this reflects a wider pattern in Korean scenes: presence can be stronger than explanation.'
    ].join("\n\n")
  },
  {
    id: "scene-3",
    title: "Why Does Closing Your Eyes Mean So Much in K-Dramas?",
    slug: "why-does-closing-your-eyes-mean-so-much",
    category: "scene-meanings",
    content: [
      'When a character closes their eyes in an emotional Korean scene, it often signals surrender to feeling. This small action can express relief, acceptance, longing, vulnerability, or emotional overwhelm.',
      'In a romantic scene, closing the eyes while being hugged or held may suggest that the person is letting themselves fully feel the moment. In a painful scene, it can indicate silent endurance or an attempt to hold emotion together.',
      'Because Korean dramas often rely on subtle nonverbal signals, this kind of movement becomes emotionally meaningful. The audience is trained to read inner feeling through small physical responses.',
      'That is why such a quiet gesture can feel unforgettable.'
    ].join("\n\n")
  },
  {
    id: "scene-4",
    title: "Why Does Sharing an Umbrella Feel Intimate?",
    slug: "why-does-sharing-an-umbrella-feel-intimate",
    category: "scene-meanings",
    content: [
      'Sharing an umbrella is a common romantic image in Korean dramas because it creates physical closeness without needing overt affection. The characters move together, adjust their pace, and enter a small shared space.',
      'Rain often adds emotional softness, nostalgia, or vulnerability to a scene. Under an umbrella, two people are temporarily separated from the outside world. That visual closeness makes unspoken tension feel stronger.',
      'In Korean romance, intimacy often grows through practical gestures. Holding an umbrella for someone can mean consideration, attentiveness, and quiet care.'
    ].join("\n\n")
  },
  {
    id: "scene-5",
    title: "Why Is Eating Together a Love Signal in Korean Content?",
    slug: "why-is-eating-together-a-love-signal",
    category: "scene-meanings",
    content: [
      'In Korean content, eating together often signals more than convenience. Shared meals can represent comfort, familiarity, care, and emotional opening. Food scenes are relational scenes.',
      'When one character prepares food for another, notices what they like, or makes sure they eat, the act often carries romantic or familial warmth. This fits the Korean cultural link between food and affection.',
      'That is why even a convenience store meal or simple soup scene can feel surprisingly intimate. The emotional meaning comes from care made visible.'
    ].join("\n\n")
  },
  {
    id: "scene-6",
    title: "Why Are Reunion Scenes Often So Quiet?",
    slug: "why-are-reunion-scenes-often-so-quiet",
    category: "scene-meanings",
    content: [
      'Korean reunion scenes are often quiet because the emotional intensity is already high. Too many words might weaken the feeling rather than deepen it. A short line, a pause, or a trembling expression can communicate more than long explanation.',
      'This is especially true when the relationship carries history, regret, or unresolved longing. The silence shows that both people feel more than they can comfortably say.',
      'That is why a scene with only **보고 싶었어** may feel more powerful than a full speech.'
    ].join("\n\n")
  },
  {
    id: "scene-7",
    title: "Why Does 'Just Being There' Count as Comfort?",
    slug: "why-does-just-being-there-count-as-comfort",
    category: "scene-meanings",
    content: [
      'In many Korean comfort scenes, the most meaningful action is simply staying. One person sits beside another, says little, and does not leave. This can feel deeply comforting because presence itself becomes support.',
      'The scene communicates that pain does not always need fixing. It needs company. In Korean emotional culture, that kind of companionship can feel profoundly loving.'
    ].join("\n\n")
  },
  {
    id: "scene-8",
    title: "Why Are Breakup Scenes So Restrained in Korean Dramas?",
    slug: "why-are-breakup-scenes-so-restrained",
    category: "scene-meanings",
    content: [
      'Breakup scenes in Korean dramas are often restrained because the pain is expressed through suppression rather than explosion. Characters may avoid shouting and instead speak carefully, pause, or fall silent.',
      'This restraint can make the scene more painful. The viewer senses the effort required to stay composed. The words become fewer because the emotion is too heavy.',
      'That is one reason restrained breakup scenes often feel unforgettable.'
    ].join("\n\n")
  },
  {
    id: "scene-9",
    title: "Why Does Walking Away Slowly Feel So Emotional?",
    slug: "why-does-walking-away-slowly-feel-so-emotional",
    category: "scene-meanings",
    content: [
      'A slow walk away is a common Korean drama image because it captures hesitation, finality, and unresolved feeling all at once. The body keeps moving, but the emotional connection remains.',
      'This visual gives the viewer time to feel what the characters cannot say. It often appears after confessions, rejections, or painful goodbyes.',
      'In Korean storytelling, movement itself can become emotional language.'
    ].join("\n\n")
  },
  {
    id: "scene-10",
    title: "Why Does Waiting Outside Someone’s House Feel Meaningful?",
    slug: "why-does-waiting-outside-someones-house-feel-meaningful",
    category: "scene-meanings",
    content: [
      'Waiting outside someone\'s house in Korean content often feels meaningful because it combines patience, emotional risk, and sincerity. The waiting character is making themselves available without forcing entry.',
      'This gesture says, "I cared enough to come," but it also respects distance. That balance between persistence and restraint is one reason the trope feels so powerful.'
    ].join("\n\n")
  },
  {
    id: "scene-11",
    title: 'Why Do Korean Parents Rarely Say "I Love You" Directly?',
    slug: "why-do-korean-parents-rarely-say-i-love-you-directly",
    category: "scene-meanings",
    content: [
      'In many Korean families, love is often shown more through action than direct verbal declaration. Parents may cook, worry, provide, sacrifice, and scold with concern rather than frequently saying "I love you."',
      'That does not mean the love is weak. It means it is often communicated through responsibility and care. This is why family scenes in Korean dramas can feel emotional even when the language stays practical.'
    ].join("\n\n")
  },
  {
    id: "scene-12",
    title: "Why Do Hospital Scenes Feel So Intense in K-Dramas?",
    slug: "why-do-hospital-scenes-feel-so-intense",
    category: "scene-meanings",
    content: [
      'Hospital scenes in Korean dramas often carry high emotional intensity because they bring together vulnerability, family duty, fear, and suppressed feeling. The sterile environment also contrasts sharply with the rawness of emotion.',
      'Such scenes often reveal who shows up, who stays, and who cares quietly. As a result, the emotional stakes feel larger than the medical setting alone would suggest.'
    ].join("\n\n")
  },
  {
    id: "scene-13",
    title: "Why Is Formal Tone So Painful in Conflict Scenes?",
    slug: "why-is-formal-tone-so-painful-in-conflict-scenes",
    category: "scene-meanings",
    content: [
      'When two characters who are usually close suddenly use formal speech, the change can feel emotionally painful. In Korean, speech level reflects relationship. So a shift to politeness can create distance, coldness, or emotional defense.',
      'Foreign viewers may miss this if subtitles stay neutral. But for Korean-speaking audiences, the tone shift itself can be heartbreaking.'
    ].join("\n\n")
  },
  {
    id: "scene-14",
    title: "Why Does Refusing Food Signal Emotional Distance?",
    slug: "why-does-refusing-food-signal-emotional-distance",
    category: "scene-meanings",
    content: [
      'Because food often represents care in Korean culture, refusing food in a drama can signal emotional shutdown, tension, or rejection. The refusal is not always about appetite. It may be about relationship.',
      'This is why food scenes are emotionally loaded. Acceptance and refusal can both carry symbolic meaning.'
    ].join("\n\n")
  },
  {
    id: "scene-15",
    title: "Why Is the First Snow So Romantic in Korean Stories?",
    slug: "why-is-the-first-snow-so-romantic",
    category: "scene-meanings",
    content: [
      'The first snow is a strong romantic symbol in Korean stories because it evokes beauty, timing, memory, and seasonal feeling. It often becomes linked to confessions, reunions, and emotionally significant moments.',
      'Winter scenes in Korean media frequently carry nostalgia, stillness, and emotional clarity. The first snow feels like a special shared moment, which makes it ideal for romance.'
    ].join("\n\n")
  },
  {
    id: "scene-16",
    title: "Why Does Covering Someone With a Blanket Mean Care?",
    slug: "why-does-covering-someone-with-a-blanket-mean-care",
    category: "scene-meanings",
    content: [
      'A small gesture like placing a blanket over someone can feel deeply caring in Korean scenes because it reflects quiet attentiveness. The person notices another\'s vulnerability and responds gently without making a big show of it.',
      'This kind of understated care fits the emotional logic of many Korean dramas.'
    ].join("\n\n")
  },
  {
    id: "scene-17",
    title: "Why Do Korean Dramas Build Tension Through Pauses?",
    slug: "why-do-korean-dramas-build-tension-through-pauses",
    category: "scene-meanings",
    content: [
      'Pauses in Korean dramas give emotional meaning room to grow. Instead of moving quickly through dialogue, the drama allows discomfort, longing, and hesitation to be felt in real time.',
      'This pacing can make scenes feel more immersive and emotionally precise. A pause asks the viewer to participate in reading the emotion.'
    ].join("\n\n")
  },
  {
    id: "scene-18",
    title: "Why Does Taking Someone Home Feel Romantic?",
    slug: "why-does-taking-someone-home-feel-romantic",
    category: "scene-meanings",
    content: [
      'Taking someone home in Korean content often feels romantic because it combines safety, concern, and extended time together. The journey becomes part of the emotional connection.',
      'It may not be a big confession, but it shows that one person wants to accompany the other a little longer. That small extension of togetherness can feel very intimate.'
    ].join("\n\n")
  },
  {
    id: "scene-19",
    title: "Why Is a Convenience Store Scene So Emotional?",
    slug: "why-is-a-convenience-store-scene-so-emotional",
    category: "scene-meanings",
    content: [
      'Convenience store scenes in Korean dramas often feel emotional because they mix ordinariness with vulnerability. Characters eat simple food, talk late at night, or share quiet moments in an everyday setting.',
      'The lack of glamour makes the feeling seem more real. Emotional closeness emerges not in a grand location, but in a familiar one.'
    ].join("\n\n")
  },
  {
    id: "scene-20",
    title: "Why Does a Hand-Holding Scene Feel So Big?",
    slug: "why-does-a-hand-holding-scene-feel-so-big",
    category: "scene-meanings",
    content: [
      'Hand-holding can feel especially meaningful in Korean dramas because physical affection is often paced carefully. As a result, a simple touch can signal emotional progress, trust, and choice.',
      'The slower build makes the gesture feel larger. It is not just contact. It is a turning point.'
    ].join("\n\n")
  }
];

export const sampleArticles = articleEntries.map(buildArticle);
