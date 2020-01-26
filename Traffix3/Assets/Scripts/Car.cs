using UnityEngine;

public class Car : MonoBehaviour
{
    /**
     * Generation 200; optimal damp factor
     */
    public static float DAMP_FACTOR = 0.1f;

    public Channel bound;
    /**
     * Generation 200; optimal speed factor
     */
    public static float speed = 22f;

    public float vel = 1f;

    /**
     * Generation 200; optimal collision box scaling values:
     * Already pre-applied within Unity:
     * 
     * Local collision box: z-scale = 2
     *                      z-offset = 2.1
     * Foreign collision box: z-scale = 4
     *                        z-offset = 3.2
     *                        
     * Derived these values from:
     * food/path attraction, obstacle avoidance/detraction, path perception,
     * obstacle perception, desired obstacle separation, speed, max acceleration/deceleration
     */

    // Start is called before the first frame update
    void Start()
    { 
        if (bound.direction == Dir.East || bound.direction == Dir.West)
        {
            // gridOffset = y comp
            transform.localPosition = new Vector3(transform.localPosition.x, transform.localPosition.y, bound.gridOffset);
        }
        else
        {
            // gridOffset = x comp
            transform.localPosition = new Vector3(bound.gridOffset, transform.localPosition.y, transform.localPosition.z);
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (bound != null)
        {
            transform.localEulerAngles = (new Vector3(0f, bound.rotation(), 0f));
            transform.Translate(Vector3.forward * Time.deltaTime * speed * vel);
        }
    }

}
