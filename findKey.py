import textwrap

def findLength(text, cipherText, key):
    text = text.replace(" ", "")
    key = key.replace(" ", "")
    rowList = textwrap.wrap(text, len(key))
    valueList = []
    for k in key:
        valueList.append({"key": k, "vals": []})
    for i in rowList:
        for j in range(len(i)):
            valueList[j]["vals"].append(i[j])
    for i in valueList:
        tempStr = str("".join(i["vals"]))
        i["vals"] = tempStr
    result = cipherText.find(valueList[0]["vals"])
    if result == -1:
       return False
    else: 
       return True  

def Lengther(text, cipherText):
    text = text.replace(" ", "")
    cipherText = cipherText.replace(" ","")
    if(len(text) != len(cipherText)):
        return 0
    counter = ""
    done = False
    while (done == False):
        counter += "a"
        if(len(counter) > 7):
            return 0
        else:    
            
            done = findLength(text,cipherText,counter)  
    num = len(counter)    
    return num
    
def findKey(text,cipherText,key):
    text = text.replace(" ", "")
    keyLetter = ""
    for i in range(key):
        keyLetter += "a"
    keyLetter = keyLetter.replace(" ", "")
    rowList = textwrap.wrap(text, len(keyLetter))
    findKeyList =[]
    valueList = []
    for k in keyLetter:
        valueList.append({"key": k, "vals": []})
    for i in rowList:
        for j in range(len(i)):
            valueList[j]["vals"].append(i[j])
    for i in valueList:
        tempStr = str("".join(i["vals"]))
        i["vals"] = tempStr
    for i in range(key):
        num = cipherText.find(valueList[i]["vals"])
        findKeyList.append({"num": num, "place": i +1})
    sortedKeyList = sorted(findKeyList, key = lambda i: i['num'],)
    finalText = []
    for i in sortedKeyList:
        finalText.append(i["place"])
    return finalText

def driver():
    txt = input("Enter Plain Text: ")
    ciph = input("Enter Cipher Text: ")
    finish = Lengther(txt,ciph) 
    if(finish == 0):
        print("you did not enter in a valid key length please try again." )
        driver()
    else:    
        doneProduct = findKey(txt,ciph,finish)
    return doneProduct

doneProduct = driver()   
print("key: ", doneProduct)      